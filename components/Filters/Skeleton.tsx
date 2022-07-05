import { Skeleton } from "@chakra-ui/react";

type SkeletonType = {
  amount: number
}

const SkeletonFilter = ({ amount }: SkeletonType) => (
  <>{Array(amount).fill('').map((_) => <Skeleton height='35px' width="80px" marginRight="10px" />)}</>
)

export default SkeletonFilter;
