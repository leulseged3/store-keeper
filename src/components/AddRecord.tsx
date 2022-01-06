import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, RefreshControl, TextStyle, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { useProps } from '../hooks';
import { AppButton } from '../components';
import { Formik } from 'formik';
import * as yup from 'yup'
import { addRecord } from '../api/add-record';
import { getRecords } from '../api/get-records';

interface IProps extends NavigationComponentProps {

}

export const AddRecord: NavigationFunctionComponent<IProps> = (_props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { Auth } = useProps(state => state)
  const [records, setRecords] = useState<Array<IRecord>>([])
  const [refreshing, setRefreshing] = useState(false);

  const addRecordValidationSchema = yup.object().shape({
    itemName: yup
      .string()
      .required('Item name is Required'),
    itemPrice: yup
      .string()
      .required('Price is required')
  });

  useEffect(() => {
    getRecords(Auth.token)
      .then(res => setRecords(res))
      .catch(err =>null)
      .finally(() => setFetching(false))
  }, [])

  const onPullToRefresh = () => {
    setRefreshing(true);
    getRecords(Auth.token)
    .then(res => setRecords(res))
    .catch(err =>null)
    .finally(() => setRefreshing(false))
  }

  const handleAddRecord = (values: { itemName: string, itemPrice: string }) => {
    console.log(values)
    setIsLoading(true)
    addRecord(values.itemName, Number(values.itemPrice), Auth.token)
      .then(res => {
        const newRecord = records;
        newRecord.push(res)
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addRecordValidationSchema}
        initialValues={{ itemName: '', itemPrice: '' }}
        onSubmit={values => handleAddRecord(values)}
      >{({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched
      }) => (
        <>
          <View style={styles.InputWrapper}>
            <TextInput
              placeholder='Item Name'
              style={styles.textInputStyle}
              keyboardType="default"
              onChangeText={handleChange('itemName')}
              onBlur={handleBlur('itemName')}
              value={values.itemName}
            />
            {(errors.itemName && touched.itemName) &&
              <Text style={styles.errorTextStyle}>{errors.itemName}</Text>
            }
          </View>

          <View style={styles.InputWrapper}>
            <TextInput
              placeholder='Item Price'
              style={styles.textInputStyle}
              keyboardType="number-pad"
              onChangeText={handleChange('itemPrice')}
              onBlur={handleBlur('itemPrice')}
              value={values.itemPrice}
            />
            {(errors.itemPrice && touched.itemPrice) &&
              <Text style={styles.errorTextStyle}>{errors.itemPrice}</Text>
            }
          </View>

          <AppButton
            title='Add Record'
            buttonContainerStyle={styles.buttonContainerStyle}
            onPress={handleSubmit}
            isDisabled={!isValid}
            isLoading={isLoading}
          />
        </>
      )}
      </Formik>
      <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 22, marginTop: 5 }}>Records</Text>

      {
        fetching ?
        <ActivityIndicator animating style={{ marginTop:25}} size={30}/>
        :
        <FlatList
        data={records}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={onPullToRefresh}
        />}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.items}>
            <Text style={{ flexGrow: 1, fontWeight: 'bold' }}>{item.itemName}</Text>
            <Text style={{ fontWeight: 'bold' }}>{item.price}</Text>
          </View>
        )}
      />
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    marginTop: 40
  } as ViewStyle,
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  } as TextStyle,
  changeLanguageButton: {
    backgroundColor: 'blue',
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  } as ViewStyle,
  InputWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    marginBottom: 10,
    borderRadius: 5
  } as ViewStyle,
  textInputStyle: {
    paddingHorizontal: 15
  } as TextStyle,
  buttonContainerStyle: {
    paddingVertical: 10,
    width: '50%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    borderRadius: 5,
    backgroundColor: 'black'
  } as ViewStyle,
  errorTextStyle: {
    fontSize: 10,
    color: 'red',
    paddingLeft: 10,
    paddingBottom: 5
  } as TextStyle,
  items: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 2.27,

    elevation: 4,
    marginBottom: 10,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 20
  }
});
