import React from "react";
import toast from "react-hot-toast";

const FormComponent = ({
  formData,
  setFormData,
  validate,
  onSubmit,
  buttonText,
  isDisabled,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const validationError = validate(name, value);
    setFormData((prev) => ({
      ...prev,
      error: {
        ...prev.error,
        [name]: validationError,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Object.keys(formData.error).reduce((acc, key) => {
      acc[key] = validate(key, formData[key]);
      return acc;
    }, {});

    if (Object.values(validationErrors).some((err) => err)) {
      setFormData((prev) => ({
        ...prev,
        error: validationErrors,
      }));
      toast.error("Please correct the errors in the form.");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        error: { ...prev.error, general: err.message },
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-1/2 w-full flex flex-col justify-center items-center"
    >
      {Object.keys(formData).map((key) => {
        if (key === "error") return null;

        return (
          <div
            className="flex items-center justify-center my-4 max-w-[181px]"
            key={key}
          >
            <div className="relative">
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className={`border-b border-black py-1 focus:border-b-2 focus:border-vermilion-500 transition-colors focus:outline-none peer bg-inherit ${
                  formData[key] !== ""
                    ? "border-b-2 border-vermilion-500 outline-none"
                    : ""
                }`}
              />
              <label
                htmlFor={key}
                className={`absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-vermilion-400 ${
                  formData[key] !== ""
                    ? "text-xs text-vermilion-400 -top-4"
                    : "top-1"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {formData.error[key] && (
                <p className="text-red-500 text-xs mt-1 ">
                  {formData.error[key]}
                </p>
              )}
            </div>
          </div>
        );
      })}
      <button
        className={`w-1/2 h-fit relative px-4 mt-4 md:mt-0 py-3 md:py-2 font-semibold rounded-lg text-lg text-white bg-vermilion-500 hover:bg-vermilion-500/90 active:top-px active:bg-vermilion-500 transition-all my-4 max-w-[181px] disabled:opacity-80`}
        disabled={isDisabled}
        type="submit"
      >
        {buttonText}
      </button>
      {formData.error.general && (
        <p className="text-vermilion-500 max-w-[181px] text-xs pb-4">
          {formData.error.general}
        </p>
      )}
    </form>
  );
};

export default FormComponent;
