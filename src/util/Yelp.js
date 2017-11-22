const clientId = 'BqU3sJI6EnVvvS0O-0bI6w';
const secret = 'gVoRxVbz3XiBnI8c1zVfuHu6d5D7AMrdQNYBi1EpIkDe1aSULQIfHGQHttqR8TOj';
let accessToken ='';

let Yelp = {

	getAccessToken(){
		if(accessToken){
			return new Promise(resolve => resolve(accessToken));
		}
		return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, {
			method: 'POST'}).then(response => {
  			return response.json();
		}).then(jsonResponse => {
     		 accessToken = jsonResponse.access_token;
    	});
	}, // end getAccessToken

	search(term, location, sortBy){
		return Yelp.getAccessToken().then( () => {
			return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
				headers: {
          			Authorization: `Bearer ${accessToken}`
        		}
			}); // end fetch
		}).then(response => {
  			return response.json();
			}).then(jsonResponse => {
				if(jsonResponse.businesses){
					return jsonResponse.businesses.map(business => ({
						
							id: business.id,
  							imageSrc: business.image_url,
  							name: business.name,
  							address: business.location.address1,
  							city: business.location.city,
  							state: business.location.state,
  							zipCode: business.location.zip_code,
  							category: business.categories[0].title,
  							rating: business.rating,
  							reviewCount: business.review_count
					}));					
				}
			});

	} // end search method

}; //end yelp object

export default Yelp;