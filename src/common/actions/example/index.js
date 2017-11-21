const exampleActionType = () => ({
  type: 'EXAMPLE',
  example: { test: true },
  createAt: Date.now(),
});

export default function exampleAction() {
  console.log('aqui');
  return dispatch => dispatch(exampleActionType());
}

