export const NeoTypes = `
  type NeoObjectsType {
    size: Float
    orbit: Float
  }

  type NeoOutputType {
    elements: Float
    objects: [NeoObjectsType]
  }
`;

export const NeoQuery = `nearEarthObjects: NeoOutputType`;
