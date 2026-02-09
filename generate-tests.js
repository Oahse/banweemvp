// Here are the Stripe test cards you can use for testing payments:

// ## **Most Common Test Cards**

// **Visa Success Card**
// - Card Number: `4242 4242 4242 4242`
// - Expiry: Any future date (e.g., `12/34`)
// - CVC: Any 3 digits (e.g., `123`)
// - ZIP: Any 5 digits (e.g., `12345`)

// **Mastercard Success Card**
// - Card Number: `5555 5555 5555 4444`
// - Expiry: Any future date
// - CVC: Any 3 digits

// ## **Test Cards for Different Scenarios**

// **3D Secure Required**
// - Card Number: `4000 0025 0000 3155`
// - Use this to test 3D Secure authentication flow

// **Card Declined - Insufficient Funds**
// - Card Number: `4000 0000 0000 9995`
// - Tests declined payment scenario

// **Card Declined - Lost/Stolen**
// - Card Number: `4000 0000 0000 9987`
// - Tests fraud detection

// **Card Declined - Expired**
// - Card Number: `4000 0000 0000 9927`
// - Tests expired card scenario

// **Generic Error**
// - Card Number: `4000 0000 0000 0119`
// - Tests processing errors

// ## **International Cards**

// **UK Debit Card**
// - Card Number: `4000 0000 0000 0002`
// - Expiry: Any future date
// - CVC: Any 3 digits

// **Brazilian Card**
// - Card Number: `4000 0000 0000 0010`
// - Expiry: Any future date
// - CVC: Any 3 digits

// ## **Testing Tips**

// 1. **Use any future expiry date** - Stripe doesn't validate the exact date, just that it's in the future
// 2. **Use any 3-digit CVC** for Visa/Mastercard
// 3. **Use any 5-digit ZIP code** for US addresses
// 4. **Test different scenarios** using the special cards above
// 5. **For 3D Secure testing**, use the `4000 0025 0000 3155` card and follow the authentication prompts

// The `4242 4242 4242 4242` Visa card is the most commonly used for successful payment testing.