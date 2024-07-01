import { Selector } from 'testcafe';
process.env.NODE_ENV = "test";

fixture`Testing Student UI`
    .page`http://localhost:4401/student`;

test('Testing add students', async t => {

    // Navigate to the database initialization page if required
    await t.navigateTo("/dbinitialize");

    // Navigate to the Add Student page
    await t.navigateTo("/addStudent");

    // Ensure the input fields and add button are present before interacting
    await t
        .expect(Selector("#student-id").exists).ok()
        .expect(Selector("#student-name").exists).ok()
        .expect(Selector("#student-age").exists).ok()
        .expect(Selector("#student-Hometown").exists).ok()
        .expect(Selector("#student-add").exists).ok();

    // Fill out the form and add the student
    await t
        .typeText("#student-id", "999999")
        .typeText("#student-name", "Pasindu Basnayaka")
        .typeText("#student-age", "45")
        .typeText("#student-Hometown", "Catholic")
        .click("#student-add");

    // Navigate to the Student list page
    await t.navigateTo("/student");

    // Ensure the student table is present before checking its contents
    const table = Selector('#student-table');
    await t.expect(table.exists).ok();

    // Get the number of rows in the table
    const rowCount = await table.find('tr').count;

    // Get the text of the last row
    const lastRowText = await table.find('tr').nth(rowCount - 1).innerText;

    // Check if the last row contains the expected student details
    await t.expect(lastRowText).contains("Pasindu Basnayaka");
});
