import { Container, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { Helmet } from "react-helmet";

// components
import FixedCartCounter from "./FixedCartCount";
import ProductActionBar from "./ProductActionBar";
import ProductList from "./ProductList";

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),

  // product header
  // h3
  "& .productHeader": {
    fontSize: 30,
    fontWeight: 500,
  },
}));

const Products = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Products | RoboAgent</title>
      </Helmet>

      {/* Fixed counter for cart */}
      <FixedCartCounter itemAmout="0" />

      {/* main container */}
      <ContainerStyle maxWidth="lg">
        {/* Header */}
        <Typography variant="h3" className="productHeader">
          Products
        </Typography>

        {/* Action bar */}
        <ProductActionBar />

        {/* Products list */}
        <ProductList />
      </ContainerStyle>
    </>
  );
};

export default Products;
