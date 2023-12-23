const validateForm = (formData,setErrors) => {
    const newErrors = {};

    // Basic validation, you can add more complex validation if needed
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim() || !formData.email.includes('.com')) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!formData.userType.trim()) {
      newErrors.userType = "User Type is required";
    }
    setErrors(newErrors);

    // Return true if there are no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };
export default validateForm;