/* eslint-disable react/require-default-props */
import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

import styles from '../../styles/Home.module.scss';

interface Props {
  device?: string;
}

const CardSkeleton = ({ device }: Props) => {
  if (device === 'mobile') {
    return (
      <Box width="100%">
        <Skeleton height="182px" />
        <Box className={styles.poster_content}>
          <Skeleton height="30px" />
          <Skeleton height="21px" margin="8px 0 12px" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" width="100%">
      <Skeleton height="100%" maxWidth="350px" width="100%" />
      <Box padding="30px 30px 64px" width="75%">
        <Skeleton height="30px" />
        <Skeleton height="21px" margin="8px 0 12px" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    </Box>
  );
};

export default CardSkeleton;
