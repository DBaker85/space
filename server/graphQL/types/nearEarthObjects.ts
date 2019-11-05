export const NeoTypes = `
  type NeoObjectsType {
    size: Float
    orbit: Float
    isLargest: Boolean
  }

  type NeoOutputType {
    elements: Float
    objects: [NeoObjectsType]
  }
`;

export const NeoQuery = `neo: NeoOutputType`;
