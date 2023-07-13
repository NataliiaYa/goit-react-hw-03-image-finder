import React, { Component } from "react";
import { featchImages } from '../services/api';


export class App extends Component{
  state = {
    query: "",
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    isEmpty: false,
    isVisible: false,
    error: null,
    modalImg: null
  };

componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }
  }
  getImages = async () => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchImages(
        this.state.query,
        this.state.page
      );

      if (this.state.images.length === 0) {
        this.setState({ isEmpty: true });
      }

      this.setState((prevState) => ({
        images: [...prevState.images, ...hits],
        totalImages: totalHits
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };