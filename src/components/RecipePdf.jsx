import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    image: {
      width: '400px',
      height: '400px', // Adjust height as needed
      marginBottom: 10,
    },
  });
  

function RecipePdf({recipeData}) {
    if (!recipeData) {
        return null; // Or render a message indicating no recipe data
      }
  return (
    <>
    
    <Document>
     <Page size="A4" style={styles.page}>
       <View style={styles.section}>
         <Text>{recipeData.title}</Text>
         <Text>Procedure: {recipeData.description}</Text>
         {/* Include Recipe Image */}
         <Image src={recipeData.recipeImage} style={styles.image} />
         <Text>Ingredients:</Text>
         <View>
          {recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
        </View>
        <Text>Cooking Time: {recipeData.cookingTime}</Text>
     </View>
     </Page>
   </Document>

    </>
  )
}

export default RecipePdf