import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Hash "mo:base/Hash";

actor {
  type ArbitratorStatus = {
    #Active;
    #Inactive;
  };

  type ProfileStatus = {
    #Regular;
    #Merchant;
  };

  type Profile = {
    name : Text;
    email : Text;
    status : Text;
    accountType : ProfileStatus;
  };

  type AdStatus = {
    #Active;
    #Inactive;
    #Suspended;
  };

  type Ad = {
    id : Nat;
    title : Text;
    description : Text;
    status : AdStatus;
    amount : Nat;
    price : Nat;  // Price per unit in ICP
  };

  type OrderStatus = {
    #Initiated;
    #AcknowledgedByMerchant;
    #AwaitingPayment;
    #AwaitingRelease;
    #Completed;
    #Disputed;
    #DisputeResolved;
    #Cancelled;
  };

  type Order = {
    id : Nat;
    buyerId : Principal;
    adId : Nat;
    amount : Nat;
    totalPrice : Nat;
    status : OrderStatus;
    createdAt : Int;
    // arbitrator : ?Principal;
  };

  type Escrow = {
  orderId : Nat;
  amount : Nat;
  merchantId : Principal;
  buyerId : Principal;
  };

  let userProfiles = HashMap.HashMap<Principal, Profile>(0, Principal.equal, Principal.hash);
  let merchantAds = HashMap.HashMap<Principal, [Ad]>(0, Principal.equal, Principal.hash);
  let orders = HashMap.HashMap<Nat, Order>(0, Nat.equal, Hash.hash);
  let escrows = HashMap.HashMap<Nat, Escrow>(0, Nat.equal, Hash.hash);
  var nextAdId : Nat = 0;
  var nextOrderId : Nat = 0;

  public shared(msg) func updateProfile(profile : Profile) : async Text {
    let caller = msg.caller;
    userProfiles.put(caller, profile);
    let principalText = Principal.toText(caller);
    Debug.print("User ID (Principal) updating profile: " # principalText);
    "Profile updated for user: " # principalText
  };

  public shared(msg) func getOwnProfile() : async ?Profile {
    let caller = msg.caller;
    let principalText = Principal.toText(caller);
    Debug.print("User ID (Principal) retrieving own profile: " # principalText);
    userProfiles.get(caller)
  };

  public func getProfileByPrincipal(userId : Principal) : async ?Profile {
    let principalText = Principal.toText(userId);
    Debug.print("Retrieving profile for User ID (Principal): " # principalText);
    userProfiles.get(userId)
  };

  public func getProfileByPrincipalText(userIdText : Text) : async ?Profile {
    let userId = Principal.fromText(userIdText);
    Debug.print("Retrieving profile for User ID (Principal): " # userIdText);
    userProfiles.get(userId)
  };

  public shared(msg) func registerAsMerchant() : async Text {
    let caller = msg.caller;
    switch (userProfiles.get(caller)) {
      case (null) {
        "Error: User profile not found. Please create a profile first.";
      };
      case (?profile) {
        if (profile.accountType == #Merchant) {
          "You are already registered as a merchant.";
        } else {
          let updatedProfile : Profile = {
            name = profile.name;
            email = profile.email;
            status = profile.status;
            accountType = #Merchant;
          };
          userProfiles.put(caller, updatedProfile);
          "Congratulations! You have been registered as a merchant.";
        };
      };
    };
  };

  public shared(msg) func createAd(title : Text, description : Text, amount : Nat, price : Nat) : async Text {
    let caller = msg.caller;
    switch (userProfiles.get(caller)) {
      case (null) { "Error: User profile not found." };
      case (?profile) {
        if (profile.accountType != #Merchant) {
          "Error: Only merchants can create ads.";
        } else {
          let newAd : Ad = {
            id = nextAdId;
            title = title;
            description = description;
            status = #Active;
            amount = amount;
            price = price;
          };
          nextAdId += 1;
          let currentAds = switch (merchantAds.get(caller)) {
            case (null) { [] };
            case (?ads) { ads };
          };
          merchantAds.put(caller, Array.append(currentAds, [newAd]));
          "Ad created successfully with ID: " # Nat.toText(newAd.id);
        };
      };
    };
  };

  public shared(msg) func updateAd(adId : Nat, title : Text, description : Text, amount : Nat, price : Nat) : async Text {
    let caller = msg.caller;
    switch (merchantAds.get(caller)) {
      case (null) { "Error: No ads found for this merchant." };
      case (?ads) {
        let updatedAds = Array.map<Ad, Ad>(ads, func (ad : Ad) : Ad {
          if (ad.id == adId) {
            {
              id = ad.id;
              title = title;
              description = description;
              status = ad.status;
              amount = amount;
              price = price;
            };
          } else {
            ad;
          };
        });
        merchantAds.put(caller, updatedAds);
        "Ad updated successfully.";
      };
    };
  };

  public shared(msg) func changeAdStatus(adId : Nat, newStatus : AdStatus) : async Text {
    let caller = msg.caller;
    switch (merchantAds.get(caller)) {
      case (null) { "Error: No ads found for this merchant." };
      case (?ads) {
        let updatedAds = Array.map<Ad, Ad>(ads, func (ad : Ad) : Ad {
          if (ad.id == adId) {
            {
              id = ad.id;
              title = ad.title;
              description = ad.description;
              status = newStatus;
              amount = ad.amount;
              price = ad.price;
            };
          } else {
            ad;
          };
        });
        merchantAds.put(caller, updatedAds);
        "Ad status updated successfully.";
      };
    };
  };

  public shared(msg) func getOwnAds() : async [Ad] {
    let caller = msg.caller;
    switch (merchantAds.get(caller)) {
      case (null) { [] };
      case (?ads) { ads };
    };
  };

  public func getAdById(adId : Nat) : async ?Ad {
    for ((_, ads) in merchantAds.entries()) {
      for (ad in ads.vals()) {
        if (ad.id == adId) {
          return ?ad;
        };
      };
    };
    null;
  };

  public func getAdsByOwner(owner : Principal) : async [Ad] {
    switch (merchantAds.get(owner)) {
      case (null) { [] };
      case (?ads) { ads };
    };
  };

  public func getAdsByStatus(status : AdStatus) : async [Ad] {
    var result : [Ad] = [];
    for ((_, ads) in merchantAds.entries()) {
      for (ad in ads.vals()) {
        if (ad.status == status) {
          result := Array.append(result, [ad]);
        };
      };
    };
    result;
  };

  public shared(msg) func createOrder(adId : Nat, amount : Nat) : async Text {
    let caller = msg.caller;
    switch (await getAdById(adId)) {
      case (null) { "Error: Ad not found." };
      case (?ad) {
        if (ad.status != #Active) {
          "Error: This ad is not active.";
        } else if (amount > ad.amount) {
          "Error: Requested amount exceeds available amount.";
        } else {
          let totalPrice = amount * ad.price;
          let newOrder : Order = {
            id = nextOrderId;
            buyerId = caller;
            adId = adId;
            amount = amount;
            totalPrice = totalPrice;
            status = #Initiated;
            createdAt = Time.now();
          };
          orders.put(nextOrderId, newOrder);
          nextOrderId += 1;
          "Order created successfully with ID: " # Nat.toText(newOrder.id) # ". Total price: " # Nat.toText(totalPrice) # " $ ";
        };
      };
    };
  };

  public func getOrderById(orderId : Nat) : async ?Order {
    orders.get(orderId);
  };

  public shared(msg) func getOwnOrders() : async [Order] {
    let caller = msg.caller;
    Array.filter<Order>(Iter.toArray(orders.vals()), func (order : Order) : Bool {
      order.buyerId == caller;
    });
  };

  public shared(msg) func acknowledgeOrder(orderId : Nat) : async Text {
  let caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      let ad = await getAdById(order.adId);
      switch (ad) {
        case (null) { "Error: Associated ad not found." };
        case (?ad) {
          if (merchantAds.get(caller) == null) {
            "Error: Only the merchant who created the ad can acknowledge the order.";
          } else if (order.status != #Initiated) {
            "Error: Order can only be acknowledged when in Initiated status.";
          } else {
            // Lock funds in escrow
            let escrow : Escrow = {
              orderId = orderId;
              amount = order.totalPrice;
              merchantId = caller;
              buyerId = order.buyerId;
            };
            escrows.put(orderId, escrow);

            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #AcknowledgedByMerchant;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order acknowledged successfully and funds locked in escrow.";
          };
        };
      };
    };
  };
};

  public shared(msg) func markOrderAsAwaitingPayment(orderId : Nat) : async Text {
    let caller = msg.caller;
    switch (orders.get(orderId)) {
      case (null) { "Error: Order not found." };
      case (?order) {
        if (order.buyerId != caller) {
          "Error: Only the buyer can mark the order as awaiting payment.";
        } else if (order.status != #AcknowledgedByMerchant) {
          "Error: Order can only be marked as awaiting payment when acknowledged by merchant.";
        } else {
          let updatedOrder = {
            id = order.id;
            buyerId = order.buyerId;
            adId = order.adId;
            amount = order.amount;
            totalPrice = order.totalPrice;
            status = #AwaitingPayment;
            createdAt = order.createdAt;
          };
          orders.put(orderId, updatedOrder);
          "Order marked as awaiting payment successfully.";
        };
      };
    };
  };

  public shared(msg) func markOrderAsAwaitingRelease(orderId : Nat) : async Text {
  let caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      let ad = await getAdById(order.adId);
      switch (ad) {
        case (null) { "Error: Associated ad not found." };
        case (?ad) {
          if (merchantAds.get(caller) == null) {
            "Error: Only the merchant who created the ad can mark the order as awaiting release.";
          } else if (order.status != #AwaitingPayment) {
            "Error: Order can only be marked as awaiting release when in AwaitingPayment status.";
          } else {
            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #AwaitingRelease;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order marked as awaiting release successfully.";
          };
        };
      };
    };
  };
};

// Add new function to complete order
public shared(msg) func completeOrder(orderId : Nat) : async Text {
  let caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      if (order.buyerId != caller) {
        "Error: Only the buyer can complete the order.";
      } else if (order.status != #AwaitingRelease) {
        "Error: Order can only be completed when in AwaitingRelease status.";
      } else {
        // Release funds from escrow to buyer
        switch (escrows.get(orderId)) {
          case (null) { "Error: No escrow found for this order." };
          case (?_escrow) {
            // Here you would typically transfer the funds to the buyer
            // For now, we'll just remove the escrow
            escrows.delete(orderId);

            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #Completed;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order completed successfully and funds released from escrow to buyer.";
          };
        };
      };
    };
  };
};

// Add new function to dispute order
public shared(msg) func disputeOrder(orderId : Nat) : async Text {
  let caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      if (order.buyerId != caller) {
        "Error: Only the buyer can dispute the order.";
      } else if (order.status == #Completed or order.status == #Cancelled) {
        "Error: Completed or cancelled orders cannot be disputed.";
      } else {
        switch (escrows.get(orderId)) {
          case (null) { "Error: No escrow found for this order. It cannot be disputed." };
          case (?_escrow) {
            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #Disputed;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order marked as disputed successfully.";
          };
        };
      };
    };
  };
};
  public func getEscrowStatus(orderId : Nat) : async ?Escrow {
    escrows.get(orderId);
  };

public shared(msg) func resolveDispute(orderId : Nat, inFavorOfBuyer : Bool) : async Text {
  let _caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      if (order.status != #Disputed) {
        "Error: Only disputed orders can be resolved.";
      } else {
        switch (escrows.get(orderId)) {
          case (null) { "Error: No escrow found for this order." };
          case (?_escrow) {
            if (inFavorOfBuyer) {
              // Release funds to buyer
              // Here you would typically transfer the funds to the buyer
              escrows.delete(orderId);
              let updatedOrder = {
                id = order.id;
                buyerId = order.buyerId;
                adId = order.adId;
                amount = order.amount;
                totalPrice = order.totalPrice;
                status = #DisputeResolved;
                createdAt = order.createdAt;
              };
              orders.put(orderId, updatedOrder);
              "Dispute resolved in favor of buyer. Funds released to buyer.";
            } else {
              // Refund merchant
              // Here you would typically transfer the funds back to the merchant
              escrows.delete(orderId);
              let updatedOrder = {
                id = order.id;
                buyerId = order.buyerId;
                adId = order.adId;
                amount = order.amount;
                totalPrice = order.totalPrice;
                status = #DisputeResolved;
                createdAt = order.createdAt;
              };
              orders.put(orderId, updatedOrder);
              "Dispute resolved in favor of merchant. Funds refunded to merchant.";
            };
          };
        };
      };
    };
  };
};
public shared(msg) func cancelOrder(orderId : Nat) : async Text {
  let caller = msg.caller;
  switch (orders.get(orderId)) {
    case (null) { "Error: Order not found." };
    case (?order) {
      if (order.buyerId != caller) {
        "Error: Only the buyer can cancel the order.";
      } else if (order.status == #Completed or order.status == #Cancelled) {
        "Error: Completed or already cancelled orders cannot be cancelled.";
      } else {
        switch (escrows.get(orderId)) {
          case (null) { 
            // If there's no escrow, just mark the order as cancelled
            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #Cancelled;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order cancelled successfully.";
          };
          case (?_escrow) {
            // Refund merchant
            // Here you would typically transfer the funds back to the merchant
            escrows.delete(orderId);
            let updatedOrder = {
              id = order.id;
              buyerId = order.buyerId;
              adId = order.adId;
              amount = order.amount;
              totalPrice = order.totalPrice;
              status = #Cancelled;
              createdAt = order.createdAt;
            };
            orders.put(orderId, updatedOrder);
            "Order cancelled successfully. Funds refunded to merchant.";
          };
        };
      };
    };
  };
};
}  