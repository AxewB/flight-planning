const rules = {
  required: value => !!value || 'Обязательное поле',
  email: value => {
    const pattern = /[a-zA-Z0-9]*@{1}[a-z]*\.[a-z]*/;
    return pattern.test(value) || 'Неправильная почта';
  }
};

export default rules;