import gql from "graphql-tag";

const FETCH_ALL_SCIENTISTS = gql`
  query FetchAllScientists {
    allScientists {
      name
      livedIn
      biographicalData
      topics
      biography
    }
  }
`;

export default FETCH_ALL_SCIENTISTS;
