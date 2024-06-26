import { loadMoreBtn } from "./refs";
export function showBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}
export function hiddenBtn() {
  loadMoreBtn.classList.add('is-hidden');
}
