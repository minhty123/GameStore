const Joiner = require('Joiner');

const registerValidator = (data) => {
    const rule = Joiner.object({
        name: Joiner.string().min(6).max(225).required(),
        email: Joiner.string().min(6).max(225).required().email(),
        password: Joiner.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    })

    return rule.validate(data);
}

module.exports.registerValidator = registerValidator;