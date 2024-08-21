import { verify } from "@dfinity/agent";
import {
    query,
    update,
    text,
    Null,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
    None,
    Some,
    Ok,
    Err,
    ic,
    Principal,
    Opt,
    nat64,
    Duration,
    Result,
    bool,
    Canister,
  } from "azle";
  import {
    Address,
    Ledger,
    binaryAddressFromAddress,
    binaryAddressFromPrincipal,
    hexAddressFromPrincipal,
  } from "azle/canisters/ledger";
import { v4 as uuid } from 'uuid';

//create user strct
const userProfile = Record({
    id: text,
    owner: Principal,
    name: text,
    email: text,
    joinedAt: text,
    merchantStatus: text,
    userStatus: text
});

//merchant status Enum
const merchantStatus = Variant({
    active: text,
    inactive: text,
    suspended: text,
});

// user status Enum
const userStatus = Variant({
    verified: text,
    banned: text
});

// merchant ads struct
const merchantAds = Record({
    id: text,
    tokenType: Principal,
    TokenAmount: nat64,
    rate: nat64,
    owner: Principal,
    status: text,
    createdAt: text,
    updatedAt: text
});

// ads status enum
const adsStatus = Variant({
    active: text,
    inactive: text,
});

// ads payload
const AdsPayload = Record({
    tokenType: Principal,
    TokenAmount: nat64,
    rate: nat64,
    status: text,
});

//balance struct
const balance = Record({
    available: nat64,
    locked: nat64,
});

//wallet struct
const wallet = Record({
    owner: Principal,
});

//dispute status enum
const disputeStatus = Variant({
    none: text,
    pending: text,
    resolved: text,
    rejected: text,
});


//order struct
const Order = Record({
    id: text,
    buyer: Principal,
    status: text,
    seller: Principal,
    dispute: text,
    arbitrator: Principal,
});

// staus enum
const Status = Variant({
    Initated: text,
    Acknowledged: text,
    Awaiting_payment: text,
    Awaiting_release: text,
    Completed: text,
    Disputed: text,
    cancelled: text,
});

// user profile payload
const userProfilePayload = Record({
    name:text,
    email:text
});

// order payload
const OrderPayload = Record({
    buyer: Principal,
    seller: Principal,
    status: text,
    dispute: text,
    arbitrator: Principal,
});

// storage
const userProfileStorage = StableBTreeMap(0, text, userProfile);
const orderStorage = StableBTreeMap(1,text, Order);
const merchantAdsStorage = StableBTreeMap(2,text, merchantAds);
const balanceStorage = StableBTreeMap(3,text, balance);

// time out
const TIMEOUT_PERIOD = 300000000000n;





export default Canister({
    // create user profile
    createUserProfile: update(
        [userProfilePayload],
        Result(userProfile, text),
        (payload) => {
            try {
                const userId = uuid();
                const user = {
                    ...payload,
                    id: userId,
                    owner: ic.caller(),
                    merchantStatus: "active",
                    userStatus: "verified",
                    joinedAt: new Date().toISOString(),
                };
                userProfileStorage.insert(userId, user);

                return Ok(user);
            } catch (error) {
                return Err("Failed to create user profile.");
            }
        }
    ),
    // get user profile by id
    getUserProfileById: query(
        [text], 
        Result(userProfile, text), 
        (userId) => {
            const userProfileOpt = userProfileStorage.get(userId);
    
            if ("None" in userProfileOpt) {
                return Err(`User profile with id ${userId} not found.`);
            }
    
            return Ok(userProfileOpt.Some);
        }
    ),

    //function to get user profile by owner principal using filter
    getUserProfileByOwner: query([], Result(userProfile, text), () => {
        const userProfiles = userProfileStorage.values().filter((user) => {
            return user.owner.toText() === ic.caller().toText();
        });
    
        if (userProfiles.length === 0) {
            return Err(`User profile for owner = ${ic.caller().toText()} not found.`);
        }
    
        return Ok(userProfiles[0]);
    }),

    //get user by principal
    getUserProfileByPrincipal: query([Principal], Result(userProfile, text), (owner) => {
        const userProfiles = userProfileStorage.values().filter((user) => {
            return user.owner.toText() === owner.toText();
        });
    
        if (userProfiles.length === 0) {
            return Err(`User profile for owner = ${owner.toText()} not found.`);
        }
    
        return Ok(userProfiles[0]);
    }),

    // update user profile to register as merchant 
    updateUserProfileToMerchant: update(
        [Principal],
        Result(userProfile, text),
        (owner) => {
            const userOpt = userProfileStorage.get(owner.toText());
    
            if ("None" in userOpt) {
                return Err(`User profile for owner = ${owner.toText()} not found.`);
            }
    
            const user = userOpt.Some;
            if (user.merchantStatus === "active") {
                return Err("User is already a merchant.");
            }
    
            userProfileStorage.insert(user.id, { ...user, merchantStatus: "active" });
            return Ok(user);
        }
    ),

    //create merchant ads if merchant status is active
    createAds: update(
        [AdsPayload],
        Result(merchantAds, text),
        (payload) => {
            try {
                const adsId = uuid();
                const userOpt = userProfileStorage.get(ic.caller().toText());
    
                if ("None" in userOpt) {
                    return Err(`User profile for owner = ${ic.caller().toText()} not found.`);
                }
    
                const user = userOpt.Some;
                if (user.merchantStatus === "active") {
                    const ads = {
                        ...payload,
                        id: adsId,
                        owner: ic.caller(),
                        status: "active",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    };
                    merchantAdsStorage.insert(adsId, ads);
                    return Ok(ads);
                } else {
                    return Err("User is not an active merchant.");
                }
            } catch (error) {
                return Err("Failed to create ad.");
            }
        }
    ),
    
    // get ads by id
    getAdsById: query(
        [text],
        Result(merchantAds, text),
        (adsId) => {
            const adsOpt = merchantAdsStorage.get(adsId);
    
            if ("None" in adsOpt) {
                return Err(`Ads with id ${adsId} not found.`);
            }
    
            return Ok(adsOpt.Some);
        }
    ),

    // create order
    createOrder: update(
        [OrderPayload],
        Result(Order, text),
        (payload) => {
            try {
                const orderId = uuid();
                const order = {
                    ...payload,
                    id: orderId,
                    buyer: ic.caller(),
                    status: "Initated",
                    dispute: "none",
                    arbitrator: Principal.fromText(""),
                };
                orderStorage.insert(orderId, order);
                return Ok(order);
            } catch (error) {
                return Err("Failed to create order.");
            }
        }
    ),
    
    // get order by id
    getOrderById: query(
        [text],
        Result(Order, text),
        (orderId) => {
            const orderOpt = orderStorage.get(orderId);
    
            if ("None" in orderOpt) {
                return Err(`Order with id ${orderId} not found.`);
            }
    
            return Ok(orderOpt.Some);
        }
    ),

    //acknowledge order by seller
    acknowledgeOrder: update(
        [text],
        Result(Order, text),
        (orderId) => {
            const orderOpt = orderStorage.get(orderId);
    
            if ("None" in orderOpt) {
                return Err(`Order with id ${orderId} not found.`);
            }
    
            const order = orderOpt.Some;
            if (order.seller.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            if (order.status !== "Initated") {
                return Err("Order is not in Initated state.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Acknowledged" });
            return Ok(order);
        }
    ),

    //cancel order by buyer if order is in Initated state
    cancelOrder: update(
        [text],
        Result(Order, text),
        (orderId) => {
            const orderOpt = orderStorage.get(orderId);
    
            if ("None" in orderOpt) {
                return Err(`Order with id ${orderId} not found.`);
            }
    
            const order = orderOpt.Some;
            if (order.buyer.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            if (order.status !== "Initated") {
                return Err("Order is not in Initated state.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "cancelled" });
            return Ok(order);
        }
    ),
    
});


