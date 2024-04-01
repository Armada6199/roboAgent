import { Container } from "@material-ui/core";
import { styled } from "@mui/material";

// components
import BlogHeader from "src/components/Blog/BlogHeader";
import BlogFilters from "src/components/Blog/BlogFilters";
import Blogs from "src/components/Blog/Blogs";
import { Helmet } from "react-helmet";

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),
}));

const Blog = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Blogs | RoboAgent</title>
      </Helmet>

      <ContainerStyle maxWidth="lg">
        {/* Header */}
        <BlogHeader />

        {/* Blog Filters */}
        <BlogFilters />

        {/* All blogs */}
        <Blogs />
      </ContainerStyle>
    </>
  );
};

export default Blog;
