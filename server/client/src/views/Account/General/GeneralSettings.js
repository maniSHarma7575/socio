import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';


const stateOptions = ['Alabama', 'New York', 'San Francisco'];

const useStyles = makeStyles(() => ({
  root: {}
}));

function GeneralSettings({ user, className, ...rest }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        country: user.country,
        email: user.email,
        name: user.name,
        phone: user.phone,
        state: user.state,
        city:user.currentCity,
        origin:user.originCity,
        desingation:user.designation,
        previousJobCompany:user.previousJob.company,
        previousJobTitle:user.previousJob.title,
        currentJobCompany:user.currentJob.company,
        currentJobTitle:user.currentJob.title,
        origin:user.originCity,
        quote:user.quote

      }}
      validationSchema={Yup.object().shape({
        country: Yup.string().max(255).required('Country is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        name: Yup.string().max(255).required('Name is required'),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
         
          resetForm();
          setStatus({ success: true });
          enqueueSnackbar('Profile updated', {
            variant: 'success'
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card
            className={clsx(classes.root, className)}
            {...rest}
          >
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="name"
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                   <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email ? errors.email : 'We will use this email to contact you'}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    helperText={touched.phone && errors.phone}
                    label="Phone Number"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                 <TextField
                    fullWidth
                    label="Select State"
                    name="state"
                    onChange={handleChange}
                    select
                    required
                    SelectProps={{ native: true }}
                    value={values.state}
                    variant="outlined"
                  >
                    {stateOptions.map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                   <TextField
                    error={Boolean(touched.city && errors.city)}
                    fullWidth
                    helperText={touched.city && errors.city}
                    label="Current City"
                    name="city"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="city"
                    value={values.city}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.country && errors.country)}
                    fullWidth
                    helperText={touched.country && errors.country}
                    label="Country"
                    name="country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="country"
                    value={values.country}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                 <TextField
                    error={Boolean(touched.origin && errors.origin)}
                    fullWidth
                    helperText={touched.origin && errors.origin}
                    label="Origin City"
                    name="origin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="origin"
                    value={values.origin}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                <TextField
                    error={Boolean(touched.desingation && errors.desingation)}
                    fullWidth
                    helperText={touched.desingation && errors.desingation}
                    label="Designation"
                    name="designation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="designation"
                    value={values.desingation}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
             
            </CardContent>
            <CardHeader title="Achievement" />
            <Divider />
            <CardContent>
            <Grid
                container
                spacing={4}
            >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.currentJobCompany && errors.currentJobCompany)}
                    fullWidth
                    helperText={touched.currentJobCompany && errors.currentJobCompany}
                    label="Current Company"
                    name="currentJobCompany"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="currentJobCompany"
                    value={values.currentJobCompany}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                    <TextField
                    error={Boolean(touched.currentJobTitle && errors.currentJobTitle)}
                    fullWidth
                    helperText={touched.currentJobTitle && errors.currentJobTitle}
                    label="Current Title"
                    name="currentJobTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="currentJobTitle"
                    value={values.currentJobTitle}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.previousJobCompany && errors.previousJobCompany)}
                    fullWidth
                    helperText={touched.previousJobCompany && errors.previousJobCompany}
                    label="previous Company"
                    name="previousJobCompany"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="previousJobCompany"
                    value={values.previousJobCompany}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                    <TextField
                    error={Boolean(touched.previousJobTitle && errors.previousJobTitle)}
                    fullWidth
                    helperText={touched.previousJobTitle && errors.previousJobTitle}
                    label="previous Title"
                    name="previousJobTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="previousJobTitle"
                    value={values.previousJobTitle}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.quote && errors.quote)}
                    fullWidth
                    helperText={touched.quote && errors.quote}
                    label="Quote"
                    name="quote"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    type="quote"
                    value={values.quote}
                    variant="outlined"
                  />
                </Grid>
            </Grid>
              {errors.submit && (
                <Box mt={3}>
                  <FormHelperText error>
                    {errors.submit}
                  </FormHelperText>
                </Box>
              )}
            </CardContent>
            <Divider />
            <Box
              p={2}
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="secondary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Save Changes
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;