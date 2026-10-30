import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/max";
import { RESTRICTED } from "@/content/countries";

/**
 * Mobile number check, shared by the sign-up form and the sign-up route so
 * both apply exactly the same rule.
 *
 * Uses Google's libphonenumber metadata (the "max" set, which knows each
 * country's number ranges and which of them are mobile), so "9876543210" is
 * valid for India and "123456" is not valid anywhere. Accepts what people
 * actually type: spaces, dashes, a leading national 0 (UK "07…"), or the
 * number with its country code already in front.
 */
export const MOBILE_ERROR = "Enter a valid mobile number for your country, without the country code.";

export function checkMobile(
  input: string,
  countryCode: string,
  dial: string,
): { ok: true; e164: string } | { ok: false } {
  const raw = input.trim();
  // Digits, spaces, brackets, dots, dashes and one leading + only.
  if (!raw || raw.length > 20 || !/^\+?[\d\s().-]+$/.test(raw)) return { ok: false };

  const country = countryCode.toUpperCase() as CountryCode;
  // First as typed (handles a national 0 or a +code already in front); then
  // as the form shows it, "+<dial>" followed by the digits. The second is what
  // makes Caribbean numbers work: their dial codes carry the area code
  // (Jamaica is 1876), so people type only the seven-digit local number.
  let parsed = parsePhoneNumberFromString(raw, country);
  if (!parsed?.isValid()) parsed = parsePhoneNumberFromString(`+${dial}${raw.replace(/\D/g, "")}`);
  if (!parsed?.isValid() || !dial.startsWith(parsed.countryCallingCode)) return { ok: false };
  // A US number typed under "Jamaica" shares +1, but is still a US number.
  if (parsed.country && RESTRICTED.has(parsed.country)) return { ok: false };

  // Landlines can't receive the one-time passwords the portal sends.
  const type = parsed.getType();
  if (type && type !== "MOBILE" && type !== "FIXED_LINE_OR_MOBILE" && type !== "PERSONAL_NUMBER") return { ok: false };

  return { ok: true, e164: parsed.number };
}
