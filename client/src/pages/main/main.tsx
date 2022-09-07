import * as THREE from "three";
import React, { useRef, useState, FunctionComponent } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styled from "styled-components";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
  useQuery,
} from "@apollo/client";

//  Initializes to true if localStorage includes a 'token' key,
// false otherwise
const isLoggedInVar = makeVar<boolean>(true);

// Initializes to an empty array
const cartItemsVar = makeVar<string[]>(["1", "2", "3"]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    cartItems: [ID!]!
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:5055/graphql",
  cache,
  typeDefs,
});

const StyledCanvasWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Box = ({ size, total, position }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  const useablesize = size / 10;
  return (
    <mesh
      position={position}
      ref={ref}
      scale={clicked ? useablesize * 1.5 : useablesize}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

/**
 * 
 * gql query ExampleQuery {
  weather {
    temperature
  }
  nearEarthObjects {
    elements
  }
}
 */

const GET_DATA = gql`
  query data {
    nearEarthObjects {
      elements
      objects {
        size
      }
    }
  }
`;

const Main: FunctionComponent = () => {
  const { data, loading } = useQuery(GET_DATA);
  if (loading) {
    return null;
  }
  const { elements, objects } = data.nearEarthObjects;
  console.log(objects);

  return (
    <StyledCanvasWrapper>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {objects.map((object) => (
          <Box
            position={[getRandomInt(-2, 2), getRandomInt(-2, 2), 0]}
            size={object.size}
            total={elements}
          />
        ))}

        <OrbitControls autoRotate autoRotateSpeed={0.1} />
      </Canvas>
    </StyledCanvasWrapper>
  );
};

const wrappedMain: FunctionComponent = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

export default wrappedMain;
