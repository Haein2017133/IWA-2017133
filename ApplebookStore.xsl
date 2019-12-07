<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <!-- this XSL stylesheet matches the <JavacoTea> tag in an associated XML
	file and replaces it with the HTML contents of the template. -->
    <xsl:template match="/">
       <script src="js/ApplebookStore.js"></script>
    <script>
  		
			            document.forms[0].txtBillAmt.value = calculateBill('bookListTable');
			            document.querySelector("#calcBill").addEventListener("click", function() {
                            document.forms[0].txtBillAmt.value = calculateBill('bookListTable'); 
                           <!--total 0is number of form--> 
			            });
                        document.querySelector("#showVeg").addEventListener("click", function() { 
                           <!--hightlight backend--> 
			                highlightVegetarian("bookListTable", this.checked);
			            });
			       
       </script>


                <table id="bookListTable" border="1" class="indent">
                    <thead align ="center">
                        <tr>
                            <th colspan="8">The current book list</th>
                        </tr>
                        

                        <tr>
                            <th>Select</th>
                            <th>ISBN</th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>publisher </th>
                            <th>Published year</th>
                             <th>Genre</th>
                            <th>Price</th>
                          
                        </tr>
                    </thead>
                    <tbody>
  
                          
                            <xsl:for-each select="/bookList/entree">
                            
                                <tr  id="{position()}" align="center">
                                    <xsl:attribute name="vegetarian">
                                         <xsl:value-of select="boolean(./@vegetarian)" />
                                </xsl:attribute>
                                    <td >
                                        <input name="item0" type="checkbox" />
                                    </td>
                                    <td width="15%">
                                        <xsl:value-of select="isbn" />
                                    </td>
                                    <td >
                                        <xsl:value-of select="author" />
                                    </td>
                                    <td >
                                        <xsl:value-of select="title" />
                                    </td>
                                    <td width="17%">
                                        <xsl:value-of select="publisher" />
                                    </td>
                                    <td>
                                        <xsl:value-of select="publishedyear" />
                                    </td>
                                     <td>
                                        <xsl:value-of select="genre" />
                                    </td>
                                    <td align="right" width="7%">
                                        <xsl:value-of select="price" />
                                  </td>
                                </tr>
                            </xsl:for-each>
                       
                    </tbody>
                </table><br/>

                <div class="col-lg-14 text-right order-2">
<!--for hightlight, total front end-->
    <form class="" id="calc">
        <p>
            <button type="button" class="btn btn-primary" name="btnCalcBill" value="Calculate Bill" id="calcBill">Calculate Bill</button>
            Total: €
            <input type="text" name="txtBillAmt" />
            <input type="checkbox" name="cbOpts" value="isVeg" id="showVeg" />
            <label for="showVeg">Highlight Vegetarian Meals</label></p>
    </form>
</div>
    </xsl:template>
</xsl:stylesheet>