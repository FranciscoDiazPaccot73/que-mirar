import { Skeleton } from "@chakra-ui/react";

type SkeletonType = {
  amount: number
}

const SkeletonFilter = ({ amount }: SkeletonType) => (
  <>{Array(amount).fill('').map((_, index) => <Skeleton key={`filter-skeleton-${index}`} height='35px' width="80px" marginRight="10px" />)}</>
)

export default SkeletonFilter;
