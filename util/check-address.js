import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex } from '@polkadot/util';

// Check address.
export default async function isValidSubstrateAddress(addr) {
    let isValid = true
    try {
        encodeAddress(isHex(addr) ? hexToU8a(addr) : decodeAddress(addr))

    } catch (err) {
        isValid = false
    }
    return isValid
}