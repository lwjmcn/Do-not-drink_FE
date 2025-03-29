import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const History = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const category = decodeURI((await params).category);

  const list = [
    { id: 1, name: "돈까스", amount: 7000, date: "2021-10-01 00:02:20" },
    { id: 2, name: "라면", amount: 2000, date: "2021-10-02 12:30:45" },
    { id: 3, name: "커피", amount: 6000, date: "2021-10-03 08:15:30" },
    { id: 4, name: "콜라", amount: 2000, date: "2021-10-04 14:45:00" },
    { id: 5, name: "케이크", amount: 9000, date: "2021-10-05 16:20:10" },
    { id: 6, name: "초밥", amount: 18000, date: "2021-10-06 19:00:00" },
    { id: 7, name: "피자", amount: 10000, date: "2021-10-07 20:30:25" },
    { id: 8, name: "치킨", amount: 23000, date: "2021-10-08 21:45:50" },
    { id: 9, name: "햄버거", amount: 11000, date: "2021-10-09 18:15:35" },
    { id: 10, name: "샐러드", amount: 10000, date: "2021-10-10 13:05:15" },
  ];

  return (
    <Box padding={2}>
      <Box>
        <Typography fontSize={60} marginLeft={-1}>
          🥄
        </Typography>
        <Typography variant={"h2"}>{category}</Typography>
        <Typography variant="caption" color={"text.secondary"}>
          총{" "}
          {list
            .map((item) => item.amount)
            .reduce((a, b) => a + b)
            .toLocaleString()}
          원을 사용했어요.
        </Typography>
      </Box>
      <Divider
        sx={{
          opacity: 0.5,
          border: "2px solid",
          borderStyle: "dotted",
          marginTop: 4,
        }}
      />
      <List>
        {list
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((item) => (
            <ListItem
              key={item.id}
              sx={{
                paddingX: 0,
                display: "flex",
                justifyContent: "space-between",
              }}
              divider
              secondaryAction={
                <ListItemText
                  primary={`${item.amount.toLocaleString()}
                원`}
                />
              }
            >
              <ListItemText
                primary={item.name}
                secondary={item.date.replace(/-/g, ".")}
              />
            </ListItem>
          ))}
      </List>
    </Box>
  );
};
export default History;
