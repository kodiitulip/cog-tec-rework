type Props = {
  variant: 'points' | 'hearts';
  value: number;
};

export const ResultCard = ({ value, variant }: Props) => {
  return <div>{variant}</div>;
};
