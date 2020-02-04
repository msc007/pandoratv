import React from 'react';
// Material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Style
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 6, 6),
  },  
}));

// AboutPage Functional Component
const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="textPrimary" paragraph>
        About Us
      </Typography>
      <Typography variant="h6"  color="textSecondary" paragraph>
        안녕하세요 저희 팥도라티비는 해외 거주 한인분들의 좀더 원활한 정보 공유를 위하여 만들어졌습니다.
        미주 한인들에게 유익한 사이트들을 조금더 손쉽게 찾아 보실수있습니다.
      </Typography>
      <Typography variant="h6"  color="textSecondary" paragraph>
        판도라티비 에서 제공되는 모든 컨텐츠는 인터넷상에서 수집된 자료를 바탕으로 제공됩니다.
        또한 모든 컨텐츠들은 판도라티비 어떠한 연관이 없으며 각 제공자의 사정에 따라 불안전하거나 삭제처리 될 수 있습니다.
      </Typography>
    </div>
  );
}

export default AboutPage;