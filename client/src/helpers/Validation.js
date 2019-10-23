export default {
    methods: {
        checkDocument(str) {
            let numbers = str.replace(/[^\d]+/g, '');

            if (numbers.length === 14) {
                return this.isValidCnpj(numbers);
            } else if (numbers.length === 11) {
                return this.isValidCpf(numbers);
            } else {
                return false;
            }
        },

        equalDigits(numbers) {
            for (let i = 0; i < numbers.length - 1; i++) {
                if (numbers.charAt(i) !== numbers.charAt(i + 1)) {
                    return false;
                }
            }

            return true;
        },

        isValidCpf(cpf) {
            if (this.equalDigits(cpf)) return false;

            let numbers, digits, sum, i, result;

            numbers = cpf.substring(0, 9);
            digits = cpf.substring(9);
            sum = 0;
            for (i = 10; i > 1; i--) {
                sum += numbers.charAt(10 - i) * i;
            }

            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

            if (result !== Number(digits.charAt(0))) {
                return false;
            }
            numbers = cpf.substring(0, 10);
            sum = 0;

            for (i = 11; i > 1; i--) {
                sum += numbers.charAt(11 - i) * i;
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

            if (result !== Number(digits.charAt(1))) {
                return false;
            }
            return true;
        },

        isValidCnpj(cnpj) {
            if (this.equalDigits(cnpj)) return false;

            let numbers, digits, sum, size, i, result, pos;
            size = cnpj.length - 2;
            numbers = cnpj.substring(0, size);
            digits = cnpj.substring(size);
            sum = 0;
            pos = size - 7;
            for (i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2) pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result != digits.charAt(0)) return false;

            size = size + 1;
            numbers = cnpj.substring(0, size);
            sum = 0;
            pos = size - 7;
            for (i = size; i >= 1; i--) {
                sum += numbers.charAt(size - i) * pos--;
                if (pos < 2) pos = 9;
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
            if (result != digits.charAt(1)) return false;

            return true;
        }
    }
};
