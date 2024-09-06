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

// Create user struct
const userProfile = Record({
    id: text,
    owner: Principal,
    name: text,
    email: text,
    joinedAt: text,
    merchantStatus: text,
    userStatus: text
});

// Merchant status Enum
const merchantStatus = Variant({
    active: text,
    inactive: text,
    suspended: text,
});

// User status Enum
const userStatus = Variant({
    verified: text,
    banned: text
});

// Merchant ads struct
const merchantAds = Record({
    id: text,
    tokenType: Principal,
    owner: Principal,
    status: text,
    createdAt: text,
    updatedAt: text
});

// Ads status enum
const adsStatus = Variant({
    active: text,
    inactive: text,
});

// Ads payload
const AdsPayload = Record({
    tokenType: Principal,
    TokenAmount: nat64,
    rate: nat64,
    status: text,
});

// Balance struct
const balance = Record({
    available: nat64,
    locked: nat64,
});

// Wallet struct
const wallet = Record({
    owner: Principal,
});

// Dispute status enum
const disputeStatus = Variant({
    none: text,
    pending: text,
    resolved: text,
    rejected: text,
});

// Order struct
const Order = Record({
    id: text,
    buyer: Principal,
    status: text,
    seller: Principal,
    dispute: text,
    arbitrator: Principal,
});

// Status enum
const Status = Variant({
    Initated: text,
    Acknowledged: text,
    Awaiting_payment: text,
    Awaiting_release: text,
    Completed: text,
    Disputed: text,
    cancelled: text,
});

// User profile payload
const userProfilePayload = Record({
    name: text,
    email: text
});

// Order payload
const OrderPayload = Record({
    buyer: Principal,
    seller: Principal,
    status: text,
    dispute: text,
    arbitrator: Principal,
});

// Rating struct
const Rating = Record({
    id: text,
    ratedBy: Principal,
    ratedEntity: text,
    rating: nat64,
    comment: Opt(text),
    createdAt: text,
});

// Storage
const userProfileStorage = StableBTreeMap(0, text, userProfile);
const orderStorage = StableBTreeMap(1, text, Order);
const merchantAdsStorage = StableBTreeMap(2, text, merchantAds);
const balanceStorage = StableBTreeMap(3, text, balance);
const ratingStorage = StableBTreeMap(4, text, Rating);

// Timeout
const TIMEOUT_PERIOD = 300000000000n;

export default Canister({
    // Create user profile
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
                    merchantStatus: "inactive",
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
    // Get user profile by id
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

    // Function to get user profile by owner principal using filter
    getUserProfileByOwner: query([], Result(userProfile, text), () => {
        const userProfiles = userProfileStorage.values().filter((user) => {
            return user.owner.toText() === ic.caller().toText();
        });
    
        if (userProfiles.length === 0) {
            return Err(`User profile for owner = ${ic.caller().toText()} not found.`);
        }
    
        return Ok(userProfiles[0]);
    }),

    // Get user by principal
    getUserProfileByPrincipal: query([Principal], Result(userProfile, text), (owner) => {
        const userProfiles = userProfileStorage.values().filter((user) => {
            return user.owner.toText() === owner.toText();
        });
    
        if (userProfiles.length === 0) {
            return Err(`User profile for owner = ${owner.toText()} not found.`);
        }
    
        return Ok(userProfiles[0]);
    }),

    // Register user as a merchant using id
    registerMerchant: update(
        [text],
        Result(userProfile, text),
        (userId) => {
            const userOpt = userProfileStorage.get(userId);
    
            if ("None" in userOpt) {
                return Err(`User profile with id ${userId} not found.`);
            }
    
            const user = userOpt.Some;
            if (user.owner.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            userProfileStorage.insert(userId, { ...user, merchantStatus: "active" });
            return Ok(user);
        }
    ),

    // Create merchant ads if merchant status is active using their id
    createMerchantAds: update(
        [text, AdsPayload],
        Result(merchantAds, text),
        (userId, payload) => {
            const userOpt = userProfileStorage.get(userId);
    
            if ("None" in userOpt) {
                return Err(`User profile with id ${userId} not found.`);
            }
    
            const user = userOpt.Some;
            if (user.owner.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            if (user.merchantStatus !== "active") {
                return Err("Merchant status is not active.");
            }
    
            try {
                const adsId = uuid();
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
            } catch (error) {
                return Err("Failed to create merchant ads.");
            }
        }
    ),
    
    // Get ads by id
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
    // Get all ads
    getAllAds: query(
        [],
        Result(Vec(merchantAds), text),
        () => {
            return Ok(merchantAdsStorage.values());
        }
    ),
    // Get all active ads
    getAllActiveAds: query(
        [],
        Result(Vec(merchantAds), text),
        () => {
            const ads = merchantAdsStorage.values().filter((ad) => {
                return ad.status === "active";
            });
    
            return Ok(ads);
        }
    ),
    // Get all inactive ads
    getAllInactiveAds: query(
        [],
        Result(Vec(merchantAds), text),
        () => {
            const ads = merchantAdsStorage.values().filter((ad) => {
                return ad.status === "inactive";
            });
    
            return Ok(ads);
        }
    ),
    // Get all suspended ads
    getAllSuspendedAds: query(
        [],
        Result(Vec(merchantAds), text),
        () => {
            const ads = merchantAdsStorage.values().filter((ad) => {
                return ad.status === "suspended";
            });
    
            return Ok(ads);
        }
    ),
    // Get all ads by owner
    getAllAdsByOwner: query(
        [Principal],
        Result(Vec(merchantAds), text),
        (owner) => {
            const ads = merchantAdsStorage.values().filter((ad) => {
                return ad.owner.toText() === owner.toText();
            });
    
            return Ok(ads);
        }
    ),
    // Create order 
    createOrder: update(
        [OrderPayload],
        Result(Order, text),
        (payload) => {
            try {
                const orderId = uuid();
                const order = {
                    ...payload,
                    id: orderId,
                };
                orderStorage.insert(orderId, order);
                return Ok(order);
            } catch (error) {
                return Err("Failed to create order.");
            }
        }
    ),
    // Acknowledge order
    acknowledgeOrder: update(
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
                return Err("Order status is not Initated.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Acknowledged" });
            return Ok(order);
        }
    ),
    // Cancel order
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
                return Err("Order status is not Initated.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "cancelled" });
            return Ok(order);
        }
    ),
    // Change order status to awaiting payment
    awaitingPayment: update(
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
    
            if (order.status !== "Acknowledged") {
                return Err("Order status is not Acknowledged.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Awaiting_payment" });
            return Ok(order);
        }
    ),
    // Change order status to awaiting release
    awaitingRelease: update(
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
    
            if (order.status !== "Awaiting_payment") {
                return Err("Order status is not Awaiting_payment.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Awaiting_release" });
            return Ok(order);
        }
    ),
    // Change order status to completed
    completeOrder: update(
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
    
            if (order.status !== "Awaiting_release") {
                return Err("Order status is not Awaiting_release.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Completed" });
            return Ok(order);
        }
    ),
    // Dispute order
    disputeOrder: update(
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
    
            if (order.status !== "Awaiting_release") {
                return Err("Order status is not Awaiting_release.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Disputed" });
            return Ok(order);
        }
    ),
    // Resolve dispute in favor of buyer
    resolveDispute: update(
        [text],
        Result(Order, text),
        (orderId) => {
            const orderOpt = orderStorage.get(orderId);
    
            if ("None" in orderOpt) {
                return Err(`Order with id ${orderId} not found.`);
            }
    
            const order = orderOpt.Some;
            if (order.arbitrator.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            if (order.status !== "Disputed") {
                return Err("Order status is not Disputed.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Completed" });
            return Ok(order);
        }
    ),
    // Reject dispute in favor of seller
    rejectDispute: update(
        [text],
        Result(Order, text),
        (orderId) => {
            const orderOpt = orderStorage.get(orderId);
    
            if ("None" in orderOpt) {
                return Err(`Order with id ${orderId} not found.`);
            }
    
            const order = orderOpt.Some;
            if (order.arbitrator.toText() !== ic.caller().toText()) {
                return Err("Unauthorized access.");
            }
    
            if (order.status !== "Disputed") {
                return Err("Order status is not Disputed.");
            }
    
            orderStorage.insert(orderId, { ...order, status: "Completed" });
            return Ok(order);
        }
    ),

    // Create rating
    createRating: update(
        [Principal, nat64, Opt(text)],
        Result(Rating, text),
        (ratedEntity, rating, comment) => {
            try {
                const ratingId = uuid();
                const newRating = {
                    id: ratingId,
                    ratedBy: ic.caller(),
                    ratedEntity: ratedEntity.toText(),
                    rating: rating,
                    comment: comment,
                    createdAt: new Date().toISOString(),
                };
                ratingStorage.insert(ratingId, newRating);
                return Ok(newRating);
            } catch (error) {
                return Err("Failed to create rating.");
            }
        }
    ),

    // Get ratings by entity
    getRatingsByEntity: query(
        [Principal],
        Result(Vec(Rating), text),
        (ratedEntity) => {
            const ratings = ratingStorage.values().filter((rating) => {
                return rating.ratedEntity === ratedEntity.toText();
            });

            if (ratings.length === 0) {
                return Err(`No ratings found for entity ${ratedEntity.toText()}.`);
            }

            return Ok(ratings);
        }
    ),
});