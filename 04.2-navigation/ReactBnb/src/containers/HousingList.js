import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import HousingListItem from '../components/HousingListItem';
import SearchBar from '../components/SearchBar';
import { fetchHousings } from '../actions/housings';
import { changeScreen } from '../actions/navigation';


class HousingList extends React.Component {
	componentDidMount() {
        this.props.fetchHousings();
	}

    render() {
        return (
			<View style={styles.container}>
				<SearchBar style={styles.searchBar} />
				<FlatList
					data={this.props.housings}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={ styles.button }
							onPress={() => this.props.changeScreen(
								'detail',
								{ housingId: item.listing.id }
							)}
						>
							<HousingListItem housing={ item } />
						</TouchableOpacity>
					)}
					keyExtractor={item => item.listing.id.toString()}
				/>
			</View>
        );
    }
}

function mapStateToProps( state ) {
    return {
        housings: state.housingList
    };
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( { changeScreen, fetchHousings }, dispatch );
}



export default connect( mapStateToProps, mapDispatchToProps )( HousingList );

const searchBarHeight = Platform.select({ android: 78, ios: 100 });
const styles = StyleSheet.create({
	container: {
		paddingTop: searchBarHeight + 15,
		paddingHorizontal: 30,
	},
    button: {
        alignItems: 'center',
	},
	searchBar: {
		position: 'absolute',
        height: searchBarHeight,
        top: 0,
        left: 0,
		right: 0,
		zIndex: 1,
	}
});