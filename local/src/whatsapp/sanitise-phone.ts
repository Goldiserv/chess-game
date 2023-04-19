export const sanitisePhoneNumber = (phoneNumber: string): string | null => {
  // Remove all non-digit characters

  try {
    const sanitised = phoneNumber.replace(/\D/g, "");
    return sanitised;
  } catch {
    return null;
  }
  // // If the number has exactly 10 digits, assume it's a local number and prepend the country code
  // if (/^\d{10}$/.test(sanitized)) {
  //   return countryCode + sanitized;
  // }

  // If the number is not in any of the expected formats, return it as is
};
