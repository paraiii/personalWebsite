// interface CountState {
//   count: number;
// }

import { useReducer } from "react";

// type CounterAction = { type: "INCREMENT" } | { type: "DECREMENT" };

// function reducer(state: CountState, action: CounterAction): CountState {
//   switch (action.type) {
//     case "INCREMENT":
//       return { count: state.count + 1 };
//     case "DECREMENT":
//       return { count: state.count - 1 };
//     default:
//       return { count: state.count };
//   }
// }
// export const TestPage = () => {
//   const initialState: CountState = { count: 0 };
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div>
//       count:{state.count}
//       <button onClick={() => dispatch({ type: "INCREMENT" })}>Add</button>
//       <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrease</button>
//     </div>
//   );
// };

// practice 2
// interface SwitchState {
//   isOn: boolean;
// }

// type SwitchAction = { type: "TOGGLE" };

// function reducer(state: SwitchState, action: SwitchAction) {
//   switch (action.type) {
//     case "TOGGLE":
//       return { isOn: !state.isOn };
//     default:
//       return state;
//   }
// }

// export const TestPage = () => {
//   const initialState: SwitchState = { isOn: false };
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <div>
//       <h1>switch:{state.isOn ? "Light on" : "Light off"}</h1>
//       <button onClick={() => dispatch({ type: "TOGGLE" })}>light</button>
//       <button onClick={() => dispatch({ type: "TOGGLE" })}>dark</button>
//     </div>
//   );
// };

interface SwitchState {
  isOn: boolean;
}
type SwitchAction = { type: "ON" } | { type: "OFF" };

function reducer(state: SwitchState, action: SwitchAction) {
  switch (action.type) {
    case "ON":
      return { isOn: true };
    case "OFF":
      return { isOn: false };
    default:
      return state;
  }
}

export const TestPage = () => {
  const initialState: SwitchState = { isOn: false };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <h1>Switch:{state.isOn ? "on" : "off"}</h1>{" "}
      <button onClick={() => dispatch({ type: "ON" })}>Switch on</button>
      <button onClick={() => dispatch({ type: "OFF" })}>Switch off</button>
    </div>
  );
};
