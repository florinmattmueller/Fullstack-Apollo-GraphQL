import gql from "graphql-tag";

const CHANGE_SCIENTIST = gql`
  mutation ChangeScientist(
    $name: String!
    $livedIn: String
    $biographicalData: String
    $topics: String
    $biography: String
  ) {
    changeScientist(
      name: $name
      livedIn: $livedIn
      biographicalData: $biographicalData
      topics: $topics
      biography: $biography
    ) {
      name
      livedIn
      biographicalData
      topics
      biography
    }
  }
`;

export default CHANGE_SCIENTIST;
