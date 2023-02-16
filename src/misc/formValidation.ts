export function formValidation(value: string, field: string ,dirty: boolean, required?: boolean): ValidationResponse {
    
    if(value.length === 0 && required && dirty) return new ValidationResponse (false, 'Ovo polje je obavezno!')

    if(field === 'username' && required) {
        if(value.length < 3) return new ValidationResponse(false, 'Korisnicko ime mora imati barem tri karaktera!');

        if(value.length > 50) return new ValidationResponse(false, 'Korisnicko ime ne moze biti duze od 50 karaktera!');
    }

    if(field === 'password' && required) {
        if(value.length < 6) return new ValidationResponse(false, 'Lozinka mora imati barem sest karaktera!');
    }

    if(field === 'email' && required) {
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
            return new ValidationResponse(false, 'Imejl nije validan!');
    }

    if(field === 'textarea' && required && value.length < 50){
        return new ValidationResponse(false, 'Ovo polje mora imati barem 50 karaktera!');
    }

    return {valid: true, value };
}

class ValidationResponse{
    valid: boolean
    value: string
    constructor(valid: boolean, value: string) {
        this.valid = valid;
        this.value = value;
    }
}