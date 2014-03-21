module.exports = {
    returnString: {
        params: {
            string: { type: 'string' }
        },
        run: function *(params, actionSkinny) {
            return params.string;
        }
    }
};