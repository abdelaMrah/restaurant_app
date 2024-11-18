import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Skeleton,
} from "@mui/material";
import {
  Restaurant as RestaurantIcon,
  Category as CategoryIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useQueries, useQuery } from "react-query";
import categorieService, { MostPopularInterfaceResponse } from "../services/categorie.service";
import menuService, { Menu } from "../services/menu.service";
import dahbordCateegorySrevice, {
  CategoryMenuRespose,
} from "../services/dashboard.service";
import {  useEffect, useMemo } from "react";
import { stringToVividColor } from "../../../utils/utils";
  
const getMenuPipe = (menu: Menu[] | undefined) => {
  if (menu) {
    const menuItems = menu?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        category: item.category.name,
        price: item.price,
        popularity: Math.floor(Math.random() * (96 - 55 + 1)) + 60,
      };
    });
    return menuItems;
  }
  return [];
};
const dashbordPipe = (data: CategoryMenuRespose[] | undefined) => {
   if (data) {
    const categoryData = data?.map((categoryMenu) => {
      return {
        name: categoryMenu.categoryName,
        value: categoryMenu.menuItems.length
      };
    });
    const COLORS = data?.map((cat) => stringToVividColor(cat.categoryName));
    return {
      categoryData,
      COLORS,
    };
  }
  return {
    categoryData: [],
    COLORS: [],
  };
};
const mostPopularPipe=(data:MostPopularInterfaceResponse[]|undefined)=>{
   if(data){
    const popular=data?.map((item)=>{
      return{
        // id:item.
        category:item.categoyId.toString(),
        name:item.plate_name,
        price:item.price,
        popularity:item.popularity
      }  
    })
    return popular[0]
   }
   return{
    id:0,
    name:'',
    category:'',
    popularity:0,
    
   }as {
    id: number;
    name: string;
    category: string;
    price: number;
    popularity: number;
}
}

export default function MenuDashboard() {
  const theme = useTheme();


  const [{data: categoriesCount, isLoading: countIsLoading },
    {data: platCount, isLoading: platCoutIsLoading },
    {data}
  ] =useQueries([
    {queryKey:['categories-count'],queryFn:async () => await categorieService.getCategoriesCount()},
    {queryKey:['lats-count'],queryFn:async () => await menuService.getCategoriesCount()},
    {queryKey:['dashboard-data'],queryFn:async () => await dahbordCateegorySrevice.getDashboardData()}
  ])
  const {data:mostPopular,isLoading:mostPopularIsLoading} = useQuery('mostMenuItemPopular',async()=>await categorieService.mostMenuItemPopular())
  useEffect(()=>{console.log(mostPopular)},[mostPopular])
   const { categoryData, COLORS } = useMemo(
    () => dashbordPipe(data?.categoryMenu),
    [data]
  );
  
  console.log({ COLORS ,categoryData});
  const menuItems = useMemo(
    () => getMenuPipe(data?.menu),
    [data?.categoryMenu]
  );
  const averagePrice =
    menuItems?.reduce((sum, item) => sum + item.price, 0) / menuItems.length;
  const mostPopularItem =menuItems?.reduce((prev,cur)=>{
    return (prev?.popularity >= cur.popularity ?prev:cur)
  },{popularity:0,name:'',category:'',id:0,price:0})
  // const mostPopularItem2 =useMemo(()=>mostPopularPipe(mostPopular),[mostPopular])
    // menuItems?.reduce((prev, current) =>
    //   prev.popularity > current.popularity ? prev : current,
    // ) ?? {}
    // if(isLoading)<>loading</>
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Tableau de Bord du Menu
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <RestaurantIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Total des Plats</Typography>
            </Box>
            <Typography variant="h4">
              {platCoutIsLoading ? <Skeleton /> : platCount}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <CategoryIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Catégories</Typography>
            </Box>
            <Typography variant="h4">
              {countIsLoading ? <Skeleton /> : categoriesCount}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Plat le Plus Populaire</Typography>
            </Box>
            <Typography variant="h6">{mostPopularIsLoading?<Skeleton/>:mostPopularItem?.name}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flexGrow: 1, minWidth: 200 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <AttachMoneyIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Prix Moyen</Typography>
            </Box>
            <Typography variant="h4">{averagePrice?(` ${averagePrice.toFixed(2)} DA`):<Skeleton/>} </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Top 5 des Plats les Plus Populaires
          </Typography>
          {menuItems && (
            <List>
              {menuItems
                ?.sort((a, b) => b.popularity - a.popularity)
                .slice(0, 5)
                .map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.category} - ${item.price.toFixed(
                        2
                      )} DA - Popularité: ${item.popularity}%`}
                    />
                  </ListItem>
                ))}
            </List>
          )}
        </Paper>

        <Paper sx={{ flexGrow: 1, minWidth: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Répartition des Catégories
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
           {
            categoryData&& <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData?.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
           }
          </ResponsiveContainer>
        </Paper>
      </Box>

      {menuItems && (
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Popularité des Plats
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={menuItems}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={100}
                />
                <YAxis
                  label={{
                    value: "Popularité (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="popularity" fill={theme.palette.primary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      )}
    </Box>
  );
}
