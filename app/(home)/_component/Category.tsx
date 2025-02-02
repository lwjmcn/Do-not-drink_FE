import { Grid, Typography } from "@mui/material";

const Category = () => {
  const categories = [
    { name: "식당", amount: 320050 },
    { name: "월세", amount: 600000 },
    { name: "교통", amount: 55000 },
    { name: "옷/패션", amount: 73000 },
    { name: "연뮤", amount: 140000 },
    { name: "병원", amount: 45000 },
    { name: "보험", amount: 30000 },
    { name: "적금", amount: 100000 },
    { name: "카페", amount: 43000 },
    { name: "통신비", amount: 50000 },
    { name: "기타", amount: 23000 },
    { name: "기타", amount: 23000 },
    { name: "기타", amount: 23000 },
    { name: "기타", amount: 23000 },
    { name: "기타", amount: 23000 },
    { name: "기타", amount: 23000 },
  ];

  return (
    <Grid container spacing={2} rowGap={4}>
      {categories
        .sort((a, b) => b.amount - a.amount)
        .map((category, index) => (
          <Grid
            key={index}
            item
            xs={index < 3 ? 4 : 3}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Typography fontSize={index < 3 ? 60 : 40}>🥄</Typography>
            <Typography
              variant={index < 3 ? "h6" : "body1"}
              maxWidth={"90px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {category.name}
            </Typography>
            <Typography variant="caption" color={"text.secondary"}>
              {category.amount.toLocaleString()}
            </Typography>
          </Grid>
        ))}
    </Grid>
  );
};
export default Category;
