{
  /* --- SCROLLABLE CONTENT --- */
}
<Box
  sx={{
    flex: "1 1 0%",
    minHeight: 0,
    overflowY: "auto",
    padding: "28px",
    display: "block",
    boxSizing: "border-box",
    "&::-webkit-scrollbar": { width: "6px" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#cbd5e1",
      borderRadius: "10px",
    },
  }}
>
  {/* 1. USER DETAILS GRID (Strict Single Row) */}
  <Grid container spacing={2} sx={{ mb: 3, alignItems: "flex-end" }}>
    <Grid item xs="auto">
      <SectionLabel
        icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
        text="Employee Name"
      />
      <Field name="username">
        {({ field }) => (
          <TextField
            {...field}
            size="small"
            placeholder="Enter Name"
            sx={{ width: "180px", ...inputSx(false) }}
          />
        )}
      </Field>
    </Grid>
    <Grid item xs="auto">
      <SectionLabel
        icon={<BadgeIcon sx={{ fontSize: 16 }} />}
        text="Designation"
      />
      <Field name="rank">
        {({ field }) => (
          <TextField
            {...field}
            size="small"
            placeholder="Enter Rank"
            sx={{ width: "180px", ...inputSx(false) }}
          />
        )}
      </Field>
    </Grid>
    <Grid item xs="auto">
      <SectionLabel
        icon={<ApartmentIcon sx={{ fontSize: 16 }} />}
        text="Department"
        required
      />
      <FormControl
        size="small"
        error={touched.department && Boolean(errors.department)}
        sx={{
          width: "140px",
          ...inputSx(touched.department && errors.department),
        }}
      >
        <InputLabel>Dept</InputLabel>
        <Select
          name="department"
          value={values.department}
          label="Dept"
          onChange={(e) => {
            setFieldValue("department", e.target.value);
            setFieldValue("floor", "");
            setFloors(departmentFloorMap[e.target.value] || []);
          }}
        >
          <MenuItem value="">Select Dept</MenuItem>
          {Object.keys(departmentFloorMap).map((dept) => (
            <MenuItem key={dept} value={dept}>
              {dept}
            </MenuItem>
          ))}
        </Select>
        {touched.department && errors.department && (
          <FieldError text={errors.department} />
        )}
      </FormControl>
    </Grid>
    <Grid item xs="auto">
      <SectionLabel
        icon={<MeetingRoomIcon sx={{ fontSize: 16 }} />}
        text="Floor"
        required
      />
      <FormControl
        size="small"
        disabled={!floors.length}
        error={touched.floor && Boolean(errors.floor)}
        sx={{ width: "140px", ...inputSx(touched.floor && errors.floor) }}
      >
        <InputLabel>Floor</InputLabel>
        <Select
          name="floor"
          value={values.floor}
          label="Floor"
          onChange={handleChange}
        >
          <MenuItem value="">Select</MenuItem>
          {floors.map((fl) => (
            <MenuItem key={fl} value={fl}>
              {fl}
            </MenuItem>
          ))}
        </Select>
        {touched.floor && errors.floor && <FieldError text={errors.floor} />}
      </FormControl>
    </Grid>
    <Grid item xs="auto">
      <SectionLabel
        icon={<DomainIcon sx={{ fontSize: 16 }} />}
        text="Office"
        required
      />
      <Field name="office">
        {({ field, meta }) => (
          <TextField
            {...field}
            size="small"
            placeholder="Office Name"
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error ? meta.error : " "}
            sx={{ width: "120px", ...inputSx(meta.touched && meta.error) }}
          />
        )}
      </Field>
    </Grid>
    <Grid item xs="auto">
      <SectionLabel icon={<RoomIcon sx={{ fontSize: 16 }} />} text="Room" />
      <Field name="room">
        {({ field }) => (
          <TextField
            {...field}
            size="small"
            placeholder="Room"
            sx={{ width: "100px", ...inputSx(false) }}
          />
        )}
      </Field>
    </Grid>
  </Grid>

  {/* 2. WARRANTY ROW (Single Row, Green/Red Borders) */}
  <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "flex-end" }}>
    <Box sx={{ width: "160px", flexShrink: 0 }}>
      <SectionLabel
        icon={<ShieldIcon sx={{ fontSize: 16 }} />}
        text="Warranty Status"
      />
      <FormControl size="small" fullWidth>
        <Select
          name="warrantyType"
          value={values.warrantyType}
          onChange={(e) => setFieldValue("warrantyType", e.target.value)}
          sx={{
            ...inputSx(false),
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                values.warrantyType === "WARRANTY" ? "#22c55e" : "#ef4444",
              borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor:
                values.warrantyType === "WARRANTY" ? "#16a34a" : "#dc2626",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor:
                values.warrantyType === "WARRANTY" ? "#15803d" : "#b91c1c",
            },
          }}
        >
          <MenuItem value="WARRANTY">Under Warranty</MenuItem>
          <MenuItem value="AMC">AMC / Old</MenuItem>
        </Select>
      </FormControl>
    </Box>

    {/* Only show Date & Supplier if Warranty is selected */}
    {values.warrantyType === "WARRANTY" && (
      <>
        <Box sx={{ flex: 1 }}>
          <SectionLabel
            icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
            text="Install Date"
            required
          />
          <Field name="date">
            {({ field, meta }) => (
              <TextField
                {...field}
                type="date"
                size="small"
                fullWidth
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error ? meta.error : " "}
                InputLabelProps={{ shrink: true }}
                sx={inputSx(meta.touched && meta.error)}
              />
            )}
          </Field>
        </Box>
        <Box sx={{ flex: 1 }}>
          <SectionLabel
            icon={<LocalShippingIcon sx={{ fontSize: 16 }} />}
            text="Supplier"
            required
          />
          <FormControl
            size="small"
            fullWidth
            error={touched.supplier && Boolean(errors.supplier)}
            sx={inputSx(touched.supplier && errors.supplier)}
          >
            <InputLabel>Supplier</InputLabel>
            <Select
              name="supplier"
              value={values.supplier}
              label="Supplier"
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              {vendor.map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
            {touched.supplier && errors.supplier && (
              <FieldError text={errors.supplier} />
            )}
          </FormControl>
        </Box>
      </>
    )}
  </Box>

  {/* 3. MACHINE DETAILS (Fixed with Flexbox instead of Grid) */}
  <Box sx={{ mb: 3 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <SectionLabel
        icon={<ComputerIcon sx={{ fontSize: 16 }} />}
        text="Machine Details"
        required
      />
      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={() =>
          setFieldValue("machineDetails", [
            ...values.machineDetails,
            { name: "", model: "", make: "", serial: [""] },
          ])
        }
        sx={{
          color: "#334155",
          fontWeight: 600,
          fontSize: "12px",
          textTransform: "none",
          "&:hover": { backgroundColor: "#f1f5f9" },
        }}
      >
        Add Machine
      </Button>
    </Box>

    <FieldArray name="machineDetails">
      {({ remove }) => {
        const selectedSystems = values.machineDetails.map((m) => m.name);
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {values.machineDetails.map((machine, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 1.5,
                  p: 2,
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "#fafafa",
                  alignItems: "flex-start", // Aligns everything to the top
                }}
              >
                <Typography
                  sx={{
                    minWidth: "25px",
                    fontWeight: 700,
                    color: "#334155",
                    fontSize: "14px",
                    mt: 1,
                  }}
                >
                  {index + 1}.
                </Typography>

                {/* System Type */}
                <Box sx={{ flex: 1 }}>
                  <Field name={`machineDetails.${index}.name`}>
                    {({ field, meta }) => (
                      <FormControl
                        fullWidth
                        size="small"
                        error={meta.touched && Boolean(meta.error)}
                      >
                        <InputLabel>Type</InputLabel>
                        <Select {...field} label="Type" sx={miniInputSx}>
                          <MenuItem value="">Select</MenuItem>
                          {MACHINE_TYPES.map((type) => (
                            <MenuItem
                              key={type}
                              value={type}
                              disabled={
                                selectedSystems.includes(type) &&
                                machine.name !== type
                              }
                            >
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                        {meta.touched && meta.error && (
                          <FieldError text={meta.error} />
                        )}
                      </FormControl>
                    )}
                  </Field>
                </Box>

                {/* Model */}
                <Box sx={{ flex: 1 }}>
                  <Field name={`machineDetails.${index}.model`}>
                    {({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Model"
                        sx={miniInputSx}
                      />
                    )}
                  </Field>
                </Box>

                {/* Make */}
                <Box sx={{ flex: 1 }}>
                  <Field name={`machineDetails.${index}.make`}>
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Make"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={
                          meta.touched && meta.error ? meta.error : " "
                        }
                        sx={miniInputSx}
                      />
                    )}
                  </Field>
                </Box>

                {/* Serial No (Flex: 2 to give it more space for CPU arrays) */}
                <Box sx={{ flex: 2 }}>
                  {machine.name === "CPU" ? (
                    <FieldArray name={`machineDetails.${index}.serial`}>
                      {({ push, remove }) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "#64748b",
                              textTransform: "uppercase",
                            }}
                          >
                            Serial No(s)
                          </Typography>
                          {machine.serial.map((s, i) => (
                            <Box
                              key={i}
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                alignItems: "center",
                              }}
                            >
                              <Field
                                name={`machineDetails.${index}.serial.${i}`}
                              >
                                {({ field }) => (
                                  <TextField
                                    {...field}
                                    size="small"
                                    placeholder={`S-${i + 1}`}
                                    sx={miniInputSx}
                                  />
                                )}
                              </Field>
                              {i > 0 && (
                                <IconButton
                                  size="small"
                                  onClick={() => remove(i)}
                                  sx={{ color: "#ef4444", p: 0.5 }}
                                >
                                  <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                              )}
                            </Box>
                          ))}
                          <Button
                            size="small"
                            startIcon={<AddIcon sx={{ fontSize: 14 }} />}
                            onClick={() => push("")}
                            sx={{
                              fontSize: "11px",
                              color: "#334155",
                              p: 0.25,
                              textTransform: "none",
                              "&:hover": { backgroundColor: "#f1f5f9" },
                            }}
                          >
                            Add Serial
                          </Button>
                        </Box>
                      )}
                    </FieldArray>
                  ) : (
                    <Field name={`machineDetails.${index}.serial`}>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          size="small"
                          placeholder="Serial No"
                          value={
                            Array.isArray(field.value)
                              ? field.value[0]
                              : field.value
                          }
                          onChange={(e) =>
                            setFieldValue(`machineDetails.${index}.serial`, [
                              e.target.value,
                            ])
                          }
                          sx={miniInputSx}
                        />
                      )}
                    </Field>
                  )}
                </Box>

                {/* Delete Machine Button */}
                {index > 0 && (
                  <IconButton
                    onClick={() => remove(index)}
                    sx={{
                      color: "#ef4444",
                      backgroundColor: "#fef2f2",
                      mt: 0.5,
                      "&:hover": { backgroundColor: "#fee2e2" },
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        );
      }}
    </FieldArray>
  </Box>
</Box>;
