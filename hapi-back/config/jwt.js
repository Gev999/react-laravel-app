const secret = process.env.JWT_SECRET;

// bring your own validation function
const validate = async function(decoded, request) {
    return { isValid: true };
};

module.exports = {
	key: secret, // Never Share your secret key
	validate: validate, // validate function defined above
	verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
};