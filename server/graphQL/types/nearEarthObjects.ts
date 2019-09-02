import { gql } from 'apollo-server-express';

export const NeoTypes = gql`
  type NeoLinksType {
    next: String
    prev: String
    self: String
  }

  type NeoDiameterDimensionType {
    estimated_diameter_min: Float
    estimated_diameter_max: Float
  }

  type NeoDiameterType {
    kilometers: NeoDiameterDimensionType
    meters: NeoDiameterDimensionType
    miles: NeoDiameterDimensionType
    feet: NeoDiameterDimensionType
  }

  type NeoRelativeVelocityType {
    kilometers_per_second: Float
    kilometers_per_hour: Float
    miles_per_hour: Float
  }

  type NeoMissDistanceType {
    astronomical: Float
    lunar: Float
    kilometers: Float
    miles: Float
  }

  type NeoCloseApproachType {
    close_approach_date: String
    close_approach_date_full: String
    epoch_date_close_approach: Float
    relative_velocity: NeoRelativeVelocityType
    miss_distance: NeoMissDistanceType
    orbiting_body: String
  }

  type NeoObjectsType {
    links: NeoLinksType
    id: Float
    neo_reference_id: Float
    name: String
    nasa_jpl_url: String
    absolute_magnitude_h: Float
    estimated_diameter: NeoDiameterType
    is_potentially_hazardous_asteroid: Boolean
    close_approach_data: [NeoCloseApproachType]
    is_sentry_object: Boolean
  }

  type NeoOutputType {
    links: NeoLinksType
    element_count: Float
    near_earth_objects: [NeoObjectsType]
  }
`;

export const NeoQuery = `neo: NeoOutputType`;
