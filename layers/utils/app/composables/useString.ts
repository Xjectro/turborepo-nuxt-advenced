export const useString = () => {
  const maskEmail = (email: string): string => {
    const [localPart, domain] = email.split("@");
    if (!localPart) return email;

    const maskedLocalPart = `${localPart.slice(0, 2)}${"*".repeat(localPart.length - 2)}`;
    return `${maskedLocalPart}@${domain}`;
  };

  return {
    maskEmail,
  };
};
