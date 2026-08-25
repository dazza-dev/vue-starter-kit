/**
 * Minimal shape of a validation field, compatible with Vuelidate and any
 * library that exposes $errors and $touch.
 */
export interface VuelidateField {
    $errors: { $message: unknown }[];
    $touch: () => void;
}
