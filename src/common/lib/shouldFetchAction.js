export default function shouldFetchAction(state, origin) {
  if (origin) {
    const originHasS = (origin.filter(i => i === 's').length === 1);
    const originHasC = (origin.filter(i => i === 'c').length === 1);

    const originComplete = (originHasS && originHasC);
    const canFetch = (!origin.length || originComplete || state.loading);
    return canFetch;
  } else if ((Object.keys(state).length !== 0 &&
      state.constructor === Object) || state.length) {
    return false;
  }
  return true;
}

