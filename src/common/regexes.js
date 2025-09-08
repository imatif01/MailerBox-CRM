export const nameRegex = /^[A-Za-z0-9\s\-.,!?@:';()&]+$/;
// Error: "Name should only contain letters, numbers, spaces, and hyphens."

export const descriptionRegex = /^[\s\S]*$/;
// Error: "Description contains invalid characters."

export const addressRegex = /^[\p{L}0-9\s.,'’\-#/\\&()áéíóúçãàèìòùâêîôûäëïöüÿ]+$/u;
// Error: "Invalid address format. Only letters, numbers, and punctuation are allowed."

export const alphaSpaceRegex = /^[a-zA-Z\s]+$/;
// Error: "This field should only contain alphabetic characters and spaces."

export const priceRegex = /^(?!0(?:\.0{1,2})?$)(?:[1-9]\d*(?:\.\d{1,2})?|0?\.\d{1,2})$/;
// Error: "Price must be a positive number with up to two decimal places."

export const wholeNumberRegex = /^[1-9][0-9]{0,3}$/;
// Error: "Number must be a positive whole number."

export const slugRegex = /^[a-z0-9\-]+$/;
// Error: "Slug must only contain lowercase letters, numbers, and hyphens."

export const cityStateCountryRegex = /^[A-Za-z\s]+$/;
// Error: "This field should only contain alphabetic characters and spaces."

export const currencyCodeRegex = /^[A-Z]{3}$/;
// Error: "Currency must be a valid 3-letter ISO 4217 code."

export const numberRegex = /^[0-9]+$/;
// Error: "This field should only contain numeric values."

export const coordinatesRegex = /^-?\d+(\.\d+)?$/;
// Error: "Coordinates must be valid decimal numbers."

export const metaTitle = /^[A-Za-z0-9\s\-\,\.\&\'\"\(\)]+$/;

export const metaDescription = /^[A-Za-z0-9\s\-\,\.\&\'\"\(\)\!\?]+$/;
