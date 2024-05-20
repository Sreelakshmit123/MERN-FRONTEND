import React from 'react'
import { ResponsivePie } from '@nivo/pie';
function Chart() {
    const data = [
        {
            id: 'Soups',
            label: 'Soups',
            value: 200,
            color: 'hsl(34, 70%, 50%)', // Specify color for lunch
        },
        {
            id: 'Lunch',
            label: 'Lunch',
            value: 150,
            color: 'hsl(29, 70%, 50%)', // Specify color for breakfast
        },
        {
            id: 'Dessert',
            label: 'Dessert',
            value: 300,
            color: 'hsl(120, 70%, 50%)', // Specify color for veg
        },
        {
            id: 'Snacks',
            label: 'Snacks',
            value: 250,
            color: 'hsl(0, 90%, 50%)', // Specify color for non-veg
        },
        {
            id: 'Drinks',
            label: 'Drinks',
            value: 220,
            color: 'hsl(300, 70%, 50%)', // Specify color for drinks
        },
    ];
  return (
    <>
      <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            defs={[
                { id: 'dots', type: 'patternDots', background: 'inherit', color: 'rgba(400, 400, 300, 0.3)', size: 4, padding: 1, stagger: true },
                { id: 'lines', type: 'patternLines', background: 'inherit', color: 'rgba(400, 255, 255, 0.3)', rotation: -45, lineWidth: 6, spacing: 10 }
            ]}
            fill={[
                { match: { id: 'Soups' }, id: 'lines' }, // Fill style for lunch
                { match: { id: 'Lunch' }, id: 'dots' }, // Fill style for breakfast
                { match: { id: 'Dessert' }, id: 'lines' }, // Fill style for veg
                { match: { id: 'Snacks' }, id: 'dots' }, // Fill style for non-veg
                { match: { id: 'Drinks' }, id: 'lines' }, // Fill style for drinks
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [{ on: 'hover', style: { itemTextColor: '#000' } }]
                }
            ]}
        />
        
       </>
  )
}

export default Chart