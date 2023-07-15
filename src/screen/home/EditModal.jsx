import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import * as Yup from 'yup'

import { COLORS } from '../../constants'
import { Formik } from 'formik'

const EditSchema = Yup.object().shape({
  item: Yup.string().required('Campo requerido')
})

const EditModal = ({ onClose, data, deleteItem, updateItem, titleButton }) => {
  return (
    <Formik
      initialValues={data}
      validationSchema={EditSchema}
      onSubmit={(values) => updateItem({ item: values })}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <View style={styles.contenet}>
            <Text style={styles.titleModal}>Acciones</Text>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.labelInput}>Cambiar nombre</Text>
            <TextInput
              value={values.item}
              onChangeText={handleChange('item')}
              onBlur={handleBlur('item')}
              style={styles.textInput}
            />
            {touched.item && errors.item && (
              <Text style={styles.errorText}>* {errors.item}</Text>
            )}
          </View>

          <View>
            <TouchableOpacity
              style={styles.containerDeleteButton}
              onPress={() => deleteItem({ item: values })}
            >
              <Text style={styles.textDeleteButton}>Eliminar {titleButton}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.containerButtonCreate} onPress={handleSubmit}>
              <Text style={styles.textButtonCreate}>Actualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerButtonCancelar} onPress={onClose}>
              <Text style={styles.textButtonCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  )
}

export default EditModal

const styles = StyleSheet.create({
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerInput: {
    marginTop: 10,
    gap: 2
  },
  labelInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT
  },
  containerButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20
  },
  containerButtonCreate: {
    backgroundColor: COLORS.ORANGE,
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '48%',
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDeleteButton: {
    backgroundColor: COLORS.DANGER_EXTRA_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    marginTop: 60
  },
  textDeleteButton: {
    color: COLORS.DANGER
  },
  textButtonCreate: {
    color: COLORS.WHITE
  },
  containerButtonCancelar: {
    backgroundColor: COLORS.GRAY,
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '48%',
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButtonCancelar: {
    color: COLORS.GRAY_SOFT
  },
  textInput: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 44,
    borderWidth: 0
  },
  errorText: {
    marginTop: 5,
    color: COLORS.ORANGE
  }
})
