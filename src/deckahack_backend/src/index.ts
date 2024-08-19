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
import { uuid as v4 } from 'uuidv4';


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

// order payload
const OrderPayload = Record({
    buyer: Principal,
    seller: Principal,
    status: text,
    dispute: text,
    arbitrator: Principal,
});

// storage
const storage = StableBTreeMap(0, text, Order);

// time out
const TIMEOUT_PERIOD = 300000000000n;





export default Canister({
    // create order
    createOrder: update([OrderPayload], Result(Order,Status),(payload) => {
        if (
            !payload.buyer ||
            !payload.seller ||
            !payload.status ||
            !payload.dispute ||
            !payload.arbitrator
        ){
            return Err ({InvalidPayload: "Missing required fields"});
        }
        const id = v4();
        const order = {
            ...payload,
            orderId : id,
            
        }
        return Ok(order);
    }),
    
})


