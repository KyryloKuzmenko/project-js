import { loader } from "./refs";

export function showLoader() { 
    loader.classList.remove('is-hidden');
}
export function hiddenLoader() {
    loader.classList.add('is-hidden');
}