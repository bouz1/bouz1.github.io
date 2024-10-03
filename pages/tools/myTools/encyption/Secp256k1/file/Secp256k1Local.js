// p: The prime modulus for the finite field.
const p = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
// G: The generator point on the Secp256k1 curve.
const G = [
	BigInt('0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798'), 
	BigInt('0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8')  
];


// Function to calculate the modular inverse using modular exponentiation
// Computes the modular multiplicative inverse of a modulo p using Fermat's Little Theorem
function modInverse(a, p) {
    return modExp(a, p - BigInt(2), p);
}

// Function for modular exponentiation (base^exp % mod)
// Efficiently computes (base^exp)mod p, using the method of exponentiation by squaring.
function modExp(base, exp, mod) {
  let result = BigInt(1);
  while (exp > 0) {
    if (exp % BigInt(2)) result = (result * base) % mod;
    base = (base * base) % mod;
    exp /= BigInt(2);
  }
  return result;
}





// Function to add two elliptic curve points
// Adds two points P1 and P2 on the elliptic curve.
function add(P1, P2) {
    const [x1, y1] = P1;
    const [x2, y2] = P2;
    if (x1 === x2 && y1 === y2) {
        return doubleP(P1);
    }
    const lambda = ((y2 - y1) * modInverse(x2 - x1, p)) % p;
    const x3 = (lambda * lambda - x1 - x2) % p;
    const y3 = (lambda * (x1 - x3) - y1) % p;

    return [(x3 + p) % p, (y3 + p) % p]; // Ensure positive results for x3, y3
}


// Function to double an elliptic curve point
function doubleP(P) {
    const [x1, y1] = P;
    const lambda = (BigInt(3) * x1 * x1 * modInverse(BigInt(2) * y1, p)) % p;
    const x3 = (lambda * lambda - BigInt(2) * x1) % p;
    const y3 = (lambda * (x1 - x3) - y1) % p;

    return [(x3 + p) % p, (y3 + p) % p]; // Ensure positive results for x3, y3
}

// Function for scalar multiplication of a Point by scalar k
// Multiplies a point by a scalar k using double-and-add method.
function Multi_kPoint (k,Point) {
    let K = null; // Initialize K as null
    // Iterate over each bit of k in reverse order
    for (const b of k.toString(2).split('').reverse()) {

        if (b === '1') {
			if (K === null) {
				K = Point; // Set K to Point if it's the first point
			} else {
            K = add(K, Point); // If the current bit is 1, add the generator point Point
			}
        }
		Point=doubleP(Point);
		
    }
    return K;
}



// Converts a compressed elliptic curve point back to its full (x, y) representation
function compressedToPoint(compressedKey) {
  const p = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
  const x = BigInt('0x' + compressedKey.slice(2));
  const rhs = (x ** BigInt(3) + BigInt(7)) % p;
  const y = modExp(rhs, (p + BigInt(1)) / BigInt(4), p);
  const yFinal = (compressedKey[1] === '2') === (y % BigInt(2) === BigInt(0)) ? y : p - y;
  var Point = [x,yFinal];
  return Point;
}



// Converts a point to its compressed form for transmission.
function point2compressed(P){
var x= P[0].toString(16);
var y= P[1].toString(16);
if (P[1]%BigInt(2)==0) evenodd="02"; // even Paire 
else        evenodd="03"; // odd  Impaire
var compressed=evenodd+x;
return compressed;
}


function sign(messageHash, privateKey) {
    const n = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'); // order of the curve

    let r = BigInt(0);
    let s = BigInt(0);
    let k = BigInt(0);
    
    while (r === BigInt(0) || s === BigInt(0)) {
        // Generate a random integer k such that 1 <= k < n
        k = BigInt('0x' + crypto.getRandomValues(new Uint8Array(32)).map(b => b.toString(16).padStart(2, '0')).join(''));
        k = k % n; // Ensure k is in the valid range

        // Calculate kG (the point on the curve)
        const kG = Multi_kPoint(k, G);
        r = kG[0] % n;

        if (r === BigInt(0)) continue;

        s = (modInverse(k, n) * (messageHash + r * privateKey)) % n;
    }

    return { r, s };
}


function verify(messageHash, signature, publicKey) {
    const { r, s } = signature;
    const p = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');
    const n = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141'); // order of the curve

    if (r <= 0 || r >= n || s <= 0 || s >= n) {
        return false; // Invalid signature
    }

    const w = modInverse(s, n);
    const u1 = (messageHash * w) % n;
    const u2 = (r * w) % n;

    const point = add(Multi_kPoint(u1, G), Multi_kPoint(u2, publicKey));
    
    if (point[0] % n === r) {
        return true; // Signature is valid
    } else {
        return false; // Signature is invalid
    }
}



