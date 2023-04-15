import * as React from 'react';

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useSort } from "@table-library/react-table-library/sort";

function DogBreedCompactTable({ nodes }) {
  // console.log("DogBreedCompactTable: nodes", nodes)
  const data = { nodes };
  const theme = useTheme([getTheme()]);
  
  // Hard Columns for Now
  const COLUMNS = [
    { label: 'ID', renderCell: (item) => item.id, resize: true, sort: { sortKey: "ID" }},
    { label: 'Breed', renderCell: (item) => item.breed, resize: true, sort: { sortKey: "Breed" }},
    { label: 'Country Of Origin', renderCell: (item) => item.countryOfOrigin, resize: true, sort: { sortKey: "Country Of Origin" }},
    { label: 'Fur Color', renderCell: (item) => item.furColor, resize: true, sort: { sortKey: "Fur Color" }},
    { label: 'Height (in)', renderCell: (item) => item.height, resize: true, sort: { sortKey: "Height (in)" }},
    { label: 'Color of Eyes', renderCell: (item) => item.eyeColor, resize: true, sort: { sortKey: "Color of Eyes" }},
    { label: 'Longevity (yrs)', renderCell: (item) => item.longevity, resize: true, sort: { sortKey: "Longevity (yrs)" }},
    { label: 'Character Traits', renderCell: (item) => item.characterTraits, resize: true, sort: { sortKey: "Character Traits" }},
    { label: 'Common Health Problems', renderCell: (item) => item.commonHealthProblems, resize: true, sort: { sortKey: "Common Health Problems" }},
  ];

  /*
  * Functions for Enabling Sort on the Table
  */
  const sort = useSort(
    data,
    { onChange: onSortChange },
    {
      sortFns: {
        "ID": (array) => array.sort((a, b) => a.id - b.id ),
        "Breed": (array) => array.sort((a, b) => a.breed.localeCompare(b.breede)),
        "Country Of Origin": (array) => array.sort((a, b) => a.countryOfOrigin.localeCompare(b.countryOfOrigin)),
        "Fur Color": (array) => array.sort((a, b) => {
          let dog1 = a.furColor.split(/[ ,]+/).filter(Boolean).map(trait => {
            return trait.charAt(0).toUpperCase() + trait.slice(1);
          })
          let dog2 = b.furColor.split(/[ ,]+/).filter(Boolean).map(trait => {
            return trait.charAt(0).toUpperCase() + trait.slice(1);
          })
          return dog1[0] - dog2[0];
        }),
        "Height (in)": (array) =>
          array.sort((a, b) => {
            let aString = a.height.split('-')
            let bString = b.height.split('-')
            return Number(aString[0]) - Number(bString[0]);
          }),
          "Color of Eyes": (array) => array.sort((a, b) => {
            let dog1 = a.eyeColor.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            let dog2 = b.eyeColor.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            return dog1[0] - dog2[0];
          }),
        "Longevity (yrs)": (array) =>
          array.sort((a, b) => {
            let aString = a.longevity.split('-')
            let bString = b.longevity.split('-')
            return Number(aString[0]) - Number(bString[0]);
          }),
          "Character Traits": (array) => array.sort((a, b) => {
            let dog1 = a.characterTraits.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            let dog2 = b.characterTraits.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            return dog1[0] - dog2[0];
          }),
          "Common Health Problems": (array) => array.sort((a, b) => {
            let dog1 = a.commonHealthProblems.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            let dog2 = b.commonHealthProblems.split(/[ ,]+/).filter(Boolean).map(trait => {
              return trait.charAt(0).toUpperCase() + trait.slice(1);
            })
            return dog1[0] - dog2[0];
          }),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  /*
  * Section for Row Expansion to see full details. Otherwise would normally be above.
  */
  const [ids, setIds] = React.useState([]);

  const handleExpand = (item) => {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  };
  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const ROW_OPTIONS = {
    renderAfterRow: (item) => (
      <>
        {ids.includes(item.id) && (
          <tr style={{ display: "flex", gridColumn: "1 / -1" }}>
            <td style={{ flex: "1" }}>
              <ul
                style={{
                  margin: "0",
                  padding: "0",
                  backgroundColor: "#e0e0e0",
                }}
              >
                <li>
                  <strong>Breed:</strong>{item.breed.toString()}
                </li>
                <li>
                  <strong>Country Of Origin:</strong> {item.countryOfOrigin}
                </li>
                <li>
                  <strong>Fur Color:</strong> {item.furColor.toString()}
                </li>
                <li>
                  <strong>Height (in):</strong> {item.height.toString()}
                </li>
                <li>
                  <strong>Color of Eyes:</strong> {item.eyeColor.toString()}
                </li>
                <li>
                  <strong>Longevity (yrs):</strong> {item.longevity.toString()}
                </li>
                <li>
                  <strong>Character Traits:</strong> {item.characterTraits.toString()}
                </li>
                <li>
                  <strong>Common Health Problems:</strong> {item.commonHealthProblems.toString()}
                </li>
              </ul>
            </td>
          </tr>
        )}
      </>
    ),
  };

  return (
    <React.Fragment>
        <CompactTable 
          columns={COLUMNS} 
          data={data}
          rowProps={ROW_PROPS}
          rowOptions={ROW_OPTIONS} 
          theme={theme}
          sort={sort}
          layout={{horizontalScroll: true}}
          />;
    </React.Fragment>
  )
};

export default DogBreedCompactTable;