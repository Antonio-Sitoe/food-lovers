import { SeachLoadingStyle } from './styles';

export const SeachLoading = () => {
  return (
    <SeachLoadingStyle>
      <div>
        {[1, 2, 3].map((i) => (
          <div key={i}/>
        ))}
      </div>
    </SeachLoadingStyle>
  );
};
