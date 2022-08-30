import * as THREE from "three";
import React, { useRef, useState, FunctionComponent } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";

const StyledCanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function Box(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

const Main: FunctionComponent = () => (
  <StyledCanvasWrapper>
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls autoRotate autoRotateSpeed={0.1} />
    </Canvas>
  </StyledCanvasWrapper>
);

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
//   makeVar,
// } from "@apollo/client";
// import React, { FunctionComponent } from "react";

// // Initializes to true if localStorage includes a 'token' key,
// // false otherwise
// export const isLoggedInVar = makeVar<boolean>(true);

// // Initializes to an empty array
// export const cartItemsVar = makeVar<string[]>(["1", "2", "3"]);

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         isLoggedIn: {
//           read() {
//             return isLoggedInVar();
//           },
//         },
//         cartItems: {
//           read() {
//             return cartItemsVar();
//           },
//         },
//       },
//     },
//   },
// });

// export const typeDefs = gql`
//   extend type Query {
//     isLoggedIn: Boolean!
//     cartItems: [ID!]!
//   }
// `;

// const client = new ApolloClient({
//   uri: "http://localhost:5055/graphql",
//   cache,
//   typeDefs,
// });

// const Main: FunctionComponent = () => <div>Hello Main</div>;

export default Main;
